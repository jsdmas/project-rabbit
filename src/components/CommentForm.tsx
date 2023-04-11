import { useMutation, useQueryClient } from "@tanstack/react-query";
import { memo, useRef } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { postComment } from "../api/threadApi";
import { replyState } from "../atoms";
import RegexHelper from "../helper/RegexHelper";
import { IpostCommentData, TTreadId } from "../types/thread";

const Form = styled.form<{ fromReplyId?: number | null }>`
    display: grid;
    grid-template-columns: 1fr 0.2fr;
    height: 100%;
    button{
        border: none;
        background-color: ${props => props.theme.buttonColor};
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
    }
    span{
        margin-top: 10px;
        color:${props => props.theme.accentColor};
    }
`;

const CommentTextarea = styled.textarea`
    height: 6vh;
    width: 90%;
    resize: none;
    border: 1px solid ${props => props.theme.accentColor};
    border-radius: 5px;
`;

const CommentForm = ({ commentParentNum }: { commentParentNum?: number }) => {
    const { threadid } = useParams() as TTreadId;
    const queryClient = useQueryClient();
    const setReply = useSetRecoilState(replyState);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IpostCommentData>();
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const { mutate } = useMutation((data: IpostCommentData) => postComment(data, threadid, commentParentNum), { onSuccess: () => queryClient.invalidateQueries(["thread", threadid]) });
    const commentSubmit = (data: IpostCommentData) => {
        mutate(data);
        setReply(null);
        reset();
    };

    const onkeydown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter" && buttonRef.current !== null) {
            buttonRef.current.focus()
        }
    };

    return (
        <Form onSubmit={handleSubmit(commentSubmit)}>
            <CommentTextarea onKeyDown={onkeydown} placeholder="comment..."
                {...register("commentContent", {
                    required: "내용은 반드시 적어야 합니다.",
                    maxLength: {
                        value: 50000,
                        message: "내용은 최대 50000글자입니다."
                    },
                    minLength: {
                        value: 1,
                        message: "최소 1글자 이상적어야 합니다."
                    },
                    validate: {
                        RegexValue: (commentContent) => RegexHelper.value(commentContent) ? true : "내용을 올바르게 적어주세요"
                    }
                })} />
            <button ref={buttonRef}>작성</button>
            <span>{errors.commentContent?.message}</span>
        </Form>

    );
};

export default memo(CommentForm);