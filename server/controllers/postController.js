import postService from "../services/postService";

export const home = async (req, res, next) => {
    const { query: { offset = 0, orderCommend = "p.created", orderby = "DESC" } } = req;
    let data = null;
    try {
        data = await postService.getList({ offset, orderCommend, orderby });
    } catch (error) {
        return next(error);
    }
    return res.sendResult({ data });
};