import { memo, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { fetchThreadList } from "../api/threadApi";
import { orderbyState, orderCommendState, searchKeywordState, keywordOptionState, errorMessageState } from "../atoms";
import Header from "../components/Header";
import Post from "../components/ThreadList";
import { throttle } from "../helper/throttle";
import { IThreadList } from "../types/thread";
import Spinner from "../components/Spinner";
import { isAxiosError } from "axios";
import Meta from "../Meta";

interface IPageData {
    data: IThreadList[]
    nextOffset: number
    pubdate: string
    rt: string
    rtcode: number
    rtmsg: string
}

const Wrapper = styled.section`
    margin: auto;
`;

const ErrorMessage = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: ${props => props.theme.textColor};
`;

const Observer = styled.div`
    background-color: ${props => props.theme.bgColor};
    width: 100%;
    height: 20vh;
`;

const Home = () => {
    const orderCommend = useRecoilValue(orderCommendState);
    const orderby = useRecoilValue(orderbyState);
    const keword = useRecoilValue(searchKeywordState);
    const kewordoption = useRecoilValue(keywordOptionState);
    const observerTargetEl = useRef<HTMLDivElement>(null);
    const throttled = useRef(throttle(() => fetchNextPage(), 500)).current;
    const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState);
    const { data: response, fetchNextPage, remove, isLoading }
        = useInfiniteQuery(["InfiniteThreadData"],
            ({ pageParam = 0 }) => fetchThreadList(pageParam, orderCommend, orderby, keword, kewordoption),
            {
                getNextPageParam: lastpage => {
                    if (lastpage === null) return undefined;
                    return lastpage.nextOffset;
                }, onError: (error) => {
                    if (isAxiosError(error)) {
                        setErrorMessage(error.response?.data.rtmsg);
                    }
                },
                refetchInterval: 1000 * 60,
                staleTime: 1000 * 60
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
    return (
        <>
            <Meta title="Rabbit" description="Rabbit 사이트의 홈페이지입니다.(포트폴리오 용)" />
            <Header remove={remove} />
            <Wrapper>
                {isLoading || !response?.pages?.length ? <Spinner isLoading={isLoading} /> :
                    response?.pages.map((page: IPageData) => {
                        if (!page) return null;
                        return page.data.map((props: IThreadList) => <Post {...props} key={props.post_id} />);
                    })
                }
                {errorMessage ? <ErrorMessage>☹️ {errorMessage}</ErrorMessage> : null}
            </Wrapper>
            <Observer ref={observerTargetEl} />
        </>
    );
};

export default memo(Home);