import RegexHelper from "../helper/RegexHelper";
import threadService from "../services/threadService";

export const home = async (req, res, next) => {
    const { query: { orderCommend = "p.created", orderby = "DESC" } } = req;
    let { query: { offset = 0 } } = req;
    let data = null;
    let nextOffset = offset;
    try {
        const totalCount = await threadService.getCount();
        if (nextOffset >= totalCount) {
            offset = 0;
        }
        data = await threadService.getList({ offset, orderCommend, orderby });
        nextOffset = nextOffset < totalCount ? parseInt(offset) + 4 : 0;
    } catch (error) {
        return next(error);
    }
    return res.sendResult({ data, nextOffset });
};

export const watch = async (req, res, next) => {
    const { params: { threadid } } = req;
    let data = null;
    let commentData = null;
    try {
        data = await threadService.getThread({ threadid });
        commentData = await threadService.getThreadComment({ threadid });
    } catch (error) {
        return next(error);
    }
    return res.sendResult({ data, commentData });
};

export const postWrite = async (req, res, next) => {
    const { body: { postTitle, postContent, userId = null } } = req;

    try {
        RegexHelper.value(postTitle, "제목을 올바르게 적어주세요");
        RegexHelper.value(postContent, "본문을 올바르게 적어주세요");
        RegexHelper.minLength(postTitle, 1, "최소 1글자 이상적어야 합니다.");
        RegexHelper.minLength(postContent, 1, "최소 1글자 이상적어야 합니다.");
        RegexHelper.maxLength(postTitle, 50, "제목은 최대 50글자입니다.");
        RegexHelper.maxLength(postContent, 1000000, "본문은 최대 1000000글자입니다.");
    } catch (error) {
        return next(error);
    }

    let data = null;
    try {
        data = await threadService.addThread({ postTitle, postContent, userId });
    } catch (error) {
        return next(error);
    }
    return res.sendResult({ data });
};

export const threadLike = async (req, res, next) => {
    const { params: { threadid } } = req;

    let data = null;
    try {
        data = await threadService.patchThreadLike({ threadid });
    } catch (error) {
        console.log(error);
        next(error);
    }
    return data;
};

export const getEdit = () => {

};