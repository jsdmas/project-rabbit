import Header from '../components/Header';
import styled from 'styled-components';

const Wrapper = styled.div`
margin-top: 7vh;
`;

const NotFound = () => {
    return (
        <Wrapper>
            <Header />
            404 처리 ㅠㅠ
        </Wrapper>
    );
};

export default NotFound;