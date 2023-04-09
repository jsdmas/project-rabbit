import RegexHelper from "../helper/RegexHelper";
import threadService from "../services/threadService";

export const getThreadList = async (req, res, next) => {
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

export const watchThread = async (req, res, next) => {
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

export const getThreadMainText = async (req, res, next) => {
    const { params: { threadid } } = req;
    let data = null;
    try {
        data = await threadService.getThread({ threadid });
    } catch (error) {
        return next(error);
    }
    return res.sendResult({ data });
};

export const createThread = async (req, res, next) => {
    const { params: { threadid }, body: { postTitle, postContent, userId = null } } = req;

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
        data = await threadService.addThread({ threadid, postTitle, postContent, userId });
    } catch (error) {
        return next(error);
    }
    return res.sendResult({ data });
};

export const editThread = async (req, res, next) => {
    const { body: { data: { postData: { postTitle, postContent, userId = null }, threadid } } } = req;
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
        data = await threadService.updateThread({ postTitle, postContent, userId, threadid });
    } catch (error) {
        return next(error);
    }
    return res.sendResult({ data });
};

export const likethread = async (req, res, next) => {
    const { params: { threadid } } = req;

    let data = null;
    try {
        data = await threadService.patchThreadLike({ threadid });
    } catch (error) {
        next(error);
    }
    return res.sendResult({ data });
};

export const threadDelete = async (req, res, next) => {
    const { params: { threadid } } = req;
    let data = null;
    try {
        data = await threadService.deleteThread({ threadid });
    } catch (error) {
        next(error);
    }
    return res.sendResult({ data });
};

export const createComment = async (req, res, next) => {
    const { params: { threadid }, body: { data: { commentParentNum = null, commentContent, userId = null } } } = req;
    const comment = commentContent.commentContent;

    try {
        RegexHelper.value(commentContent, "내용을 올바르게 적어주세요");
        RegexHelper.minLength(commentContent, 1, "내용은 1글자 이상적어야 합니다.");
        RegexHelper.maxLength(commentContent, 100, "내용은 최대 100글자입니다.");
    } catch (error) {
        return next(error);
    }
    let data = null;
    try {
        data = await threadService.postComment({ threadid, commentContent: comment, userId, commentParentNum });
    } catch (error) {
        console.log(error);
        next(error);
    }
    return res.sendResult({ data });
};

export const threadDeleteComment = async (req, res, next) => {
    const { body: { commentId } } = req;
    console.debug("threadDeleteComment");
    console.debug(commentId);
    let data = null;
    try {
        data = await threadService.deleteComment({ commentId });
    } catch (error) {
        return next(error);
    }
    return res.sendResult({ data });
};

export const updateComment = async (req, res, next) => {
    const { body: { data: { commentId, commentContent, userId = null } } } = req;
    const comment = commentContent.commentContent;
    console.log(req.body);

    try {
        RegexHelper.value(commentContent, "내용을 올바르게 적어주세요");
        RegexHelper.minLength(commentContent, 1, "내용은 1글자 이상적어야 합니다.");
        RegexHelper.maxLength(commentContent, 100, "내용은 최대 100글자입니다.");
    } catch (error) {
        return next(error);
    }
    let data = null;
    try {
        data = await threadService.patchComment({ commentContent: comment, userId, commentId });
    } catch (error) {
        console.log(error);
        next(error);
    }
    return res.sendResult({ data });
};

export const likecomment = async (req, res, next) => {
    const { body: { commentId } } = req;
    let data = null;
    try {
        data = await threadService.commentLike({ commentId });
    } catch (error) {
        return next(error);
    }
    return res.sendResult({ data });
};