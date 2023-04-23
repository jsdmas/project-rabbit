import passport from "passport";
import { Strategy } from "passport-local";
import { Strategy as NaverStrategy } from "passport-naver";
import { Strategy as KakaoStrategy } from "passport-kakao";
import bcrypt from "bcrypt";
import userService from "../services/userService";
import { UnauthorizedException } from "./ExceptionHelper";

/**
 * @description 인증 전략을 등록하고, 데이터를 저장하거나 불러올떄 이용되는 함수
 */
export const passportConfig = () => {
    // 직렬화 (Serialization) : 객체를 직렬화하여 전송 가능한 형태로 만든다.
    passport.serializeUser((user, done) => {
        // req.login(user, ...) 가 실행되면 직렬화 실행.
        done(null, user.user_id);
    });

    // 역직렬화 (Deserialization) : 직렬화된 파일 등을 역으로 직렬화하여 다시 객체의 형태로 만든다.
    passport.deserializeUser(async (user_id, done) => {
        // serializeUser 가 done 하거나 passport.session()이 실행되면 실행된다.
        // 즉, 서버 요청이 올때마다 항상 실행하여 로그인 유저 정보를 불러와 이용한다.
        console.log(user_id);
        await userService.userInfo({ user_id })
            .then(result => {
                const { description, ...information } = result;
                done(null, information)
            })
            .catch(error => done(error));
    });

    localStrategy();
    naverStrategy();
    kakaoStrategy();
};

const localStrategy = () => {
    // auth 라우터에서 /login 요청이 오면 local설정대로 이쪽이 실행되게 된다.
    passport.use(
        new Strategy({
            usernameField: "email",
            passwordField: "password",
        }, async (email, password, done) => {
            try {
                const userExists = await userService.userExists({ email });
                if (userExists) {
                    const result = await bcrypt.compare(password, userExists.password);
                    if (result) {
                        done(null, userExists);
                    } else {
                        throw new UnauthorizedException("비밀번호가 일치하지 않습니다.");
                    }

                } else {
                    throw new UnauthorizedException("가입되지 않은 회원입니다.");
                }
            } catch (error) {
                done(error);
            }
        })
    )
};

const naverStrategy = () => {
    passport.use(
        new NaverStrategy(
            {
                clientID: process.env.NAVER_CLIENT_ID,
                clientSecret: process.env.NAVER_CLIENT_SECRET,
                callbackURL: process.env.NAVER_CALLBACK_URL,
            }, async (accessToken, refreshToken, profile, done) => {
                const { _json: { nickname, email, profile_image, id } } = profile;
                try {
                    const userExists = await userService.userExists({ email });
                    // 이미 가입된 네이버 프로필이면 성공
                    if (userExists) {
                        done(null, userExists);
                    } else {
                        // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
                        const newUser = await userService.createAcount({ email, nickname, img_url: profile_image, sns_id: id });
                        done(null, newUser);
                    }
                } catch (error) {
                    console.error(error);
                    done(error);
                }
            }
        )
    );
};

const kakaoStrategy = () => {
    passport.use(
        new KakaoStrategy(
            {
                clientID: process.env.KAKAO_ID, // 카카오 로그인에서 발급받은 REST API 키
                callbackURL: process.env.KAKAO_CALLBACK_URL, // 카카오 로그인 Redirect URI 경로
            },
            async (accessToken, refreshToken, profile, done) => {
                console.log(profile);
                const { _json: { properties: { nickname }, id, kakao_account_email = "이메일 미등록" } } = profile;
                try {
                    // sns id가 기존유저가 있는지 비교
                    const userExists = await userService.userExistsSNSId({ sns_id: id });
                    // 이미 가입된 카카오 프로필이면 성공
                    console.log("userExists passport값");
                    console.log(userExists);
                    if (userExists) {
                        done(null, userExists);
                    } else {
                        const newUser = await userService.createAcount({ email: kakao_account_email, nickname, sns_id: id });
                        done(null, newUser);
                    }
                } catch (error) {
                    console.error(error);
                    done(error);
                }
            }
        ),
    );
};