import { memo, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { fetchPostData } from "../api";
import { orderbyState, orderCommendState } from "../atoms";
import Header from "../components/Header";
import Post, { IPost } from "../components/Post";
import { throttle } from "lodash";

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
    const observerTargetEl = useRef<HTMLDivElement>(null);
    const throttled = useRef(throttle(() => fetchNextPage(), 1000)).current;
    const { isLoading, data: response, fetchNextPage }
        = useInfiniteQuery(["postData"],
            ({ pageParam = 0 }) => fetchPostData(pageParam, orderCommend, orderby),
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
        }, { threshold: 0.8 });
        io.observe(observerTargetEl.current);
    }, [throttled]);

    return (
        <>
            <Header />
            <Wrapper>
                {isLoading ? null :
                    response?.pages.map(value => value.data.map((props: IPost) => <Post {...props} key={props.post_id} />))}
            </Wrapper>
            <Observer ref={observerTargetEl} />
        </>
    );
};

// memo로 감싼이유는 다른 state(ex: dark on off) 가 변경되었을 때 데이터를 불러오게 하지 않게 위해서 입니다.
export default memo(Home);