import { memo, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { fetchThreadList } from "../api";
import { orderbyState, orderCommendState, searchKeywordState, keywordOptionState } from "../atoms";
import Header from "../components/Header";
import Post from "../components/ThreadList";
import { throttle } from "lodash";
import { IThreadList } from "../types/thread";

interface IPageData {
    data: IThreadList[]
    nextOffset: number
    pubdate: string
    rt: string
    rtcode: number
    rtmsg: string
}

const Wrapper = styled.div`
    margin: auto;
`;

const Observer = styled.div`
    background-color: black;
    width: 100%;
    height: 20vh;
`;

const Home = () => {
    const orderCommend = useRecoilValue(orderCommendState);
    const orderby = useRecoilValue(orderbyState);
    const keword = useRecoilValue(searchKeywordState);
    const kewordoption = useRecoilValue(keywordOptionState);
    const observerTargetEl = useRef<HTMLDivElement>(null);
    const throttled = useRef(throttle(() => fetchNextPage(), 300)).current
    const { data: response, fetchNextPage, remove, isLoading }
        = useInfiniteQuery(["InfiniteThreadData"],
            ({ pageParam = 0 }) => fetchThreadList(pageParam, orderCommend, orderby, keword, kewordoption),
            {
                getNextPageParam: lastpage => {
                    if (lastpage === null) return undefined;
                    return lastpage.nextOffset;
                }, onError: () => console.log("error!!!"),
                retry: 3
            });
    useEffect(() => {
        if (!observerTargetEl.current) return;
        const io = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                throttled();
            }
        }, { threshold: 0.5 });
        io.observe(observerTargetEl.current);
    }, [throttled]);
    console.log(response);
    console.log(isLoading);
    return (
        <>
            <Header remove={remove} />
            <Wrapper>
                {isLoading || !response?.pages?.length ? null :
                    response?.pages.map((page: IPageData) => {
                        if (!page) return null;
                        return page.data.map((props: IThreadList) => <Post {...props} key={props.post_id} />);
                    })
                }
            </Wrapper>
            <Observer ref={observerTargetEl} />
        </>
    );
};

export default memo(Home);