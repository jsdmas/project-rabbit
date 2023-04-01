import axios from "axios";

interface IpostData {
    offset: number
    orderCommend: string
    orderby: string
};

export const fetchPostData = async ({ offset = 0, orderCommend = "p.created", orderby = "DESC" }: IpostData) => {
    let response = null;
    try {
        const { data } = await axios.get("/getpost", { params: { offset, orderCommend, orderby } });
        response = data;
    } catch (error) {
        console.error(error);
        return response;
    }
    return response;
};