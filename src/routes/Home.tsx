import { memo, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { fetchThreads } from "../api";
import { orderbyState, orderCommendState } from "../atoms";
import Header from "../components/Header";
import Post, { IThreadList } from "../components/ThreadList";
import { throttle } from "lodash";

const Wrapper = styled.div`
    margin: auto;
`;

const Observer = styled.div`
background-color: black;
width: 100%;
height: 20vh;
`;
interface IPageData {
    data: IThreadList[]
    nextOffset: number
    pubdate: string
    rt: string
    rtcode: number
    rtmsg: string
}

const Home = () => {
    const orderCommend = useRecoilValue(orderCommendState);
    const orderby = useRecoilValue(orderbyState);
    const observerTargetEl = useRef<HTMLDivElement>(null);
    const throttled = useRef(throttle(() => fetchNextPage(), 1200)).current;
    const { data: response, fetchNextPage, refetch, remove, isLoading }
        = useInfiniteQuery(["InfiniteThreadData"],
            ({ pageParam = 0 }) => fetchThreads(pageParam, orderCommend, orderby),
            {
                getNextPageParam: lastpage => {
                    return lastpage.nextOffset;
                },

            });

    console.log(response);
    useEffect(() => {
        if (!observerTargetEl.current) return;
        const io = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                throttled();
            }
        }, { threshold: 0.7 });
        io.observe(observerTargetEl.current);
        return () => io.disconnect();
    }, [throttled]);

    return (
        <>
            <Header refetch={refetch} remove={remove} />
            <Wrapper>
                {isLoading || !response?.pages?.length ? null :
                    response?.pages.map((value: IPageData) => value.data.map((props: IThreadList) => <Post {...props} key={props.post_id} />))
                }
            </Wrapper>
            <Observer ref={observerTargetEl} />
        </>
    );
};

export default memo(Home);