import axios from "axios";

export const fetchData = async () => {
    let response = null;
    try {
        const { data } = await axios.get("http://localhost:8000");
        response = data;
    } catch (error) {
        console.error(error);
    }
    return response;
};