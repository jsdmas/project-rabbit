import passport from "passport";
import RegexHelper from "../helper/RegexHelper";
import userService from "../services/userService";
import bcrypt from "bcrypt";
import { UnauthorizedException } from "../helper/ExceptionHelper";
import { avatarUpload } from "../middlewares";
import { BadRequestException } from "../helper/ExceptionHelper";

export const createAcount = async (req, res, next) => {
    const { body: { data: { email, password, nickname } } } = req;
    let result = null;
    try {
        const emailExists = await userService.emailExists({ email });
        if (emailExists) {
            throw new UnauthorizedException("이미 사용중인 이메일입니다.");
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

export const logout = async (req, res, next) => {
    req.logout((error) => {
        if (error) {
            return next(error);
        }
    });
    req.session.destroy();
    res.clearCookie('connect.sid');
    return res.sendResult({ logout: "SUCESS" });
};

export const loginStatus = (req, res) => {
    const loginState = req.isAuthenticated();
    if (req.user) {
        const loginUserId = req?.user?.userId;
        const loginUserSnsId = req?.user?.snsId;
        return res.sendResult({ loginState, loginUserId, loginUserSnsId });
    }
    return res.sendResult({ loginState });
};

export const getUserProfile = async (req, res, next) => {
    const { params: { loginUserId } } = req;
    let data = null;
    let activityCount = null;
    try {
        data = await userService.userInfo({ user_id: loginUserId });
        activityCount = await userService.userActivityCount({ user_id: loginUserId });
    } catch (error) {
        next(error);
    }
    return res.sendResult({ data, activityCount });
};

export const patchDescription = async (req, res, next) => {
    const { params: { loginUserId } } = req;
    const { body: { userDescription } } = req;
    let data = null;
    try {
        RegexHelper.maxLength(userDescription, 50000);
        data = await userService.patchUserDescription({ user_id: loginUserId, userDescription });
    } catch (error) {
        return next(error);
    }
    return res.sendResult({ data });
};

export const deleteUser = async (req, res, next) => {
    const { params: { loginUserId } } = req;
    let data = null;
    try {
        data = await userService.killUser({ user_id: loginUserId });
        req.session.destroy();
        res.clearCookie('connect.sid');
    } catch (error) {
        return next(error);
    }
    return res.sendResult({ data });
};

export const changePassword = async (req, res, next) => {
    const { body: { changePW, currentPW, loginUserId } } = req;
    let data = null;
    let oldPassword = null;
    try {
        oldPassword = await userService.getPassword({ user_id: loginUserId });
        const ok = await bcrypt.compare(currentPW, oldPassword);
        if (!ok) {
            throw new UnauthorizedException("기존 비밀번호와 일치하지 않습니다.");
        }
        const newPassword = await bcrypt.hash(changePW, 5);
        await userService.changeOfPassword({ newPassword, user_id: loginUserId });
    } catch (error) {
        return next(error);
    }
    return res.sendResult({ data });
};

export const changePhoto = async (req, res, next) => {
    const upload = avatarUpload.single("userImageFile");
    upload(req, res, async (error) => {
        let data = null;
        try {
            const { file, body: { loginUserId }, user: { img_url } } = req;
            data = await userService.changeAvatar({ user_id: loginUserId, newImgUrl: file?.path ? file?.path : img_url });
            if (error) {
                throw new BadRequestException(400, "파일 크기는 10KB 까지 가능합니다.");
            }
        } catch (error) {
            return next(error);
        }
        return res.sendResult({ data });
    });
};