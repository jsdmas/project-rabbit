import passport from "passport";
import RegexHelper from "../helper/RegexHelper";
import userService from "../services/userService";
import bcrypt from "bcrypt";
import { BadRequestException } from "../helper/ExceptionHelper";

export const createAcount = async (req, res, next) => {
    const { body: { data: { email, password, nickname } } } = req;
    let result = null;
    try {
        const emailExists = await userService.emailExists({ email });
        if (emailExists) {
            throw new BadRequestException(409, "이미 사용중인 이메일입니다.");
        }

        RegexHelper.value(email);
        RegexHelper.value(password);
        RegexHelper.value(nickname);
        RegexHelper.minLength(password, 1, "비밀번호를 입력해주세요");
        RegexHelper.minLength(nickname, 1, "nickname을 입력해주세요");
        RegexHelper.minLength(email, 1, "이메일을 입력해주세요");
        RegexHelper.maxLength(password, 255, "비밀번호 입력값을 확인해주세요");
        RegexHelper.maxLength(nickname, 20, "nickname 을 확인해주세요");
        RegexHelper.email(email, "이메일을 정확하게 입력해주세요");
    } catch (error) {
        return next(error);
    }

    const encryptedPW = await bcrypt.hash(password, 5);

    try {
        result = await userService.createAcount({ email, password: encryptedPW, nickname });
    } catch (error) {
        return next(error);
    }

    return res.sendResult({ result });
};

export const login = async (req, res, next) => {
    /**
     * 콜백 미들웨어는 localstrategy에서 done()이 호출되면 실행됩니다.
     * @param authError 서버에러
     * @param user 유저정보
     * @param info 로그인 실패 정보
     */
    passport.authenticate("local", (authError, user, info) => {
        // 서버에서 처리과정중 에러가 날시
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        // db에서 유저정보가 맞지 않을시 
        if (!user) {
            return res.sendResult({ info: info.message });
        }
        /*
            로그인이 성공할시 
            LoginError 는 passport.deserializeUser((id, done) => 가 done()이 되면 실행하게 된다.)
        */
        return req.login(user, loginError => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }

            return res.sendResult({ data: "SUCESS" })
        });
    })(req, res, next);
};

export const logout = async (req, res, _) => {
    req.logout();
    await req.session.destroy();
    return res.sendResult({ logout: "SUCESS" });
};