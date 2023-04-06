import styled from 'styled-components';
import RegexHelper from '../helper/RegexHelper';
import BackPageIcon from '../components/BackPageIcon';
import Header from '../components/Header';
import { useForm } from "react-hook-form"
import { postThread } from '../api';
import { useNavigate } from 'react-router-dom';
import { IpostData } from '../types/thread';

const Wrapper = styled.div`
    margin-top: 8vh;
    color: ${props => props.theme.textColor};
    padding:0px 1em;
    height: 50vh;
`;

const Head = styled.header`
    place-self: center center;
    display: flex;
    justify-content: space-between;
    span{
        font-size: 1.2em;
        color: ${props => props.theme.buttonColor};
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    height: 100%;
    color:${props => props.theme.textColor};
`;

const TitleInput = styled.input`
    width:100%;
    height: 10%;
    background-color: ${props => props.theme.postColor};
    border:1px solid ${props => props.theme.accentColor};
    border-radius: 5px;
    color:${props => props.theme.textColor};
`;

const ContentTextArea = styled.textarea`
    height:50%;
    width: 100%;
    resize: none;
    background-color: ${props => props.theme.postColor};
    border:1px solid ${props => props.theme.accentColor};
    border-radius: 5px;
    color:${props => props.theme.textColor};
`;

const SubmitButton = styled.button`
    width: 100%;
    color: #fff;
    background-color: ${props => props.theme.buttonColor};
    border: none;
    border-radius: 5px;
    height: 10%;
    cursor: pointer;
`;

const ErrorMessage = styled.span`
    color: ${props => props.theme.accentColor};
    height: 3%;
    font-size: 1em;
`;

const ImgInput = styled.input`
visibility: hidden;
`;

const Write = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<IpostData>();
    const navigate = useNavigate();
    const onVaild = async (postData: IpostData) => {
        const { data: response } = await postThread(postData);
        navigate(`/thread/${response}`);
    };
    return (
        <>
            <Header />
            <Wrapper>
                <Head>
                    <BackPageIcon />
                    <span>Write</span>
                </Head>
                <Form onSubmit={handleSubmit(onVaild)}>
                    <TitleInput {...register("postTitle", {
                        required: "제목은 반드시 적어야 합니다.",
                        maxLength: {
                            value: 50,
                            message: "제목은 최대 50글자입니다."
                        },
                        minLength: {
                            value: 1,
                            message: "최소 1글자 이상적어야 합니다."
                        },
                        validate: {
                            RegexValue: (title) => RegexHelper.value(title) ? true : "제목을 올바르게 적어주세요",
                        }
                    })} placeholder='Title...' />
                    <ErrorMessage>{errors?.postTitle?.message}</ErrorMessage>
                    <ContentTextArea {...register("postContent", {
                        required: "본문은 반드시 적어야 합니다.",
                        maxLength: {
                            value: 1000000,
                            message: "본문은 최대 1000000글자입니다."
                        },
                        minLength: {
                            value: 1,
                            message: "최소 1글자 이상적어야 합니다."
                        },
                        validate: {
                            RegexValue: (content) => RegexHelper.value(content) ? true : "본문을 올바르게 적어주세요",
                        }
                    })} placeholder='Content...' />
                    <ErrorMessage>{errors?.postContent?.message}</ErrorMessage>
                    <SubmitButton type="submit">완료</SubmitButton>
                </Form>
            </Wrapper>
        </>
    );
};

export default Write;