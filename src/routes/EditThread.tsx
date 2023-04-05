import styled from 'styled-components';
import BackPageIcon from '../components/BackPageIcon';
import Header from '../components/Header';

const Wrapper = styled.div`
    margin-top: 8vh;
    color: ${props => props.theme.textColor};
    padding:0px 1em;
`;

const EditThread = () => {
    return (
        <>
            <Header />
            <Wrapper>
                <BackPageIcon />
            </Wrapper>
        </>
    );
};

export default EditThread;