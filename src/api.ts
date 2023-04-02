import axios from "axios";

export const fetchPostData = async (offset = 0, orderCommend = "p.created", orderby = "DESC") => {
    let response = null;
    try {
        const { data } = await axios.get("/getpost", { params: { offset, orderCommend, orderby } });
        response = data;
    } catch (error) {
        console.log(error);
        return;
    }
    return response;
};