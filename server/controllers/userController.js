import RegexHelper from "../helper/RegexHelper";
import userService from "../services/userService";
import bcrypt from "bcrypt";

export const createAcount = async (req, res, next) => {
    const { body: { data: { email, password, nickname } } } = req;
    let result = null;
    try {
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

};
