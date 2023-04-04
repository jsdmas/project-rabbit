import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchThread } from "../api";
import Header from "../components/Header";

type TTreadId = {
    threadid: string
};

const Thread = () => {
    const { threadid } = useParams() as TTreadId;
    console.log(threadid);
    const { isLoading, data: response } = useQuery(["thread", threadid], () => fetchThread(threadid));
    console.log(isLoading ? response : null);
    return (
        <>
            <Header />
        </>
    );
};

export default Thread;