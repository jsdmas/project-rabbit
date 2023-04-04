import threadService from "../services/threadService";

export const home = async (req, res, next) => {
    const { query: { orderCommend = "p.created", orderby = "DESC" } } = req;
    let { query: { offset = 0 } } = req;
    let data = null;
    let nextOffset = offset;
    try {
        const totalCount = await threadService.getCount();
        if (nextOffset == totalCount) {
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
    try {
        data = await threadService.getThread();
    } catch (error) {
        return next(error);
    }
    return res.sendResult({ data });
};