import { useQuery } from "@tanstack/react-query";
import { memo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { fetchPostData } from "../api";
import { offsetState, orderbyState, orderCommendState } from "../atoms";
import Header from "../components/Header";
import Post, { IPost } from "../components/Post";

interface IData {
    data: IPost[],
    pubdate: string,
    rt: string,
    rtcode: number,
    rtmsg: string
}

const Wrapper = styled.div`
    margin: auto;
`;

const Home = () => {

    const [offset, setOffset] = useRecoilState(offsetState);
    const orderCommend = useRecoilValue(orderCommendState);
    const orderby = useRecoilValue(orderbyState);
    // page 스크롤마다 offset 4 씩 증가
    const { isLoading, data: response } = useQuery<IData>(["getPost"], () => fetchPostData({ offset, orderCommend, orderby }), { staleTime: 30 * 60 * 1000, cacheTime: 30 * 60 * 1000 });
    console.log(response?.data);
    return (
        <>
            <Header />
            <Wrapper>
                {isLoading ? null : response?.data.map(props => <Post {...props} key={props.post_id} />)}
            </Wrapper>
        </>
    );
};

// memo로 감싼이유는 다른 state(ex: dark on off) 가 변경되었을 때 데이터를 불러오게 하지 않게 위해서 입니다.
export default memo(Home);