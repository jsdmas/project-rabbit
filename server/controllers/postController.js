import postService from "../services/postService";

export const home = async (req, res, next) => {
    let data = null;
    try {
        data = await postService.getList();
    } catch (error) {
        return next(error);
    }
    return res.sendResult({ data });
};