import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../components/Header';
import styled from 'styled-components';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.section`
    margin-top: 7vh;
    height: 85vh;
`;

const Text = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: inherit;
    color: ${props => props.theme.textColor};
`;

const Home = styled.button`
    background-color: ${props => props.theme.buttonColor};
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 20px;
    font-size: 2em;
    padding: 10px;
    border: none;
    transition: 0.2s ease-in-out;
    &:hover{
        background-color: ${props => props.theme.accentColor};
    }
`;

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <Wrapper>
            <Header />
            <Text>
                <Home onClick={() => navigate("/")} type='button'>
                    <FontAwesomeIcon icon={faHouse} /> 홈으로
                </Home>
                페이지를 찾을 수 없어요!!😵
            </Text>
        </Wrapper>
    );
};

export default NotFound;