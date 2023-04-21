import { memo, useState } from "react";
import Header from "../components/Header";
import { deleteUser, editDescription, getUserProfile, uploadUserProfile } from "../api/userApi";
import useLoginInfo from "../hooks/useLoginInfo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useError from "../hooks/useError";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import BackPageIcon from "../components/BackPageIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faPenToSquare, faPerson } from "@fortawesome/free-solid-svg-icons";
import { IActivityCount, Iprofile } from "../types/user";
import Spinner from "../components/Spinner";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Grid = styled.div`
    margin-top: 8vh;
    display: grid;
    height: 60vh;
    grid-template-rows: 1fr 5fr 2fr 0.2fr 2fr;
`;
const TopNav = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 20px;
    span{
        place-self: center start;
    }
    svg{
        place-self: center end;
        font-size: 1.5em;
        color: ${props => props.theme.buttonColor};
        transition: 0.2s ease-in-out;
        cursor: pointer;
        &:hover{
            color: ${props => props.theme.accentColor};
            transform: rotate(90deg);
        }
    }
`;

const ProfileImg = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    svg{
        width: 30%;
        height: 30%;
    }
`;

const UserDescription = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    color: ${props => props.theme.textColor};
    span{
        width: 20%;
        display: flex;
        justify-content: space-evenly;
        font-size: 22px;
    }
    p{
        opacity: 0.6;
        padding: 10px;
    }

    svg{
        color: ${props => props.theme.buttonColor};
        cursor: pointer;
        &:hover{
            color: ${props => props.theme.accentColor};
        }
    }
`;

const UserActivitySection = styled.div`
    color: ${props => props.theme.accentColor};
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

const EditForm = styled.form`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    textarea{
        width: 80%;
        height: 100%;
        border-radius: 5px;
        resize: none;
    }
    button{
        width: 10%;
        height: 100%;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        background-color: ${props => props.theme.buttonColor};
        color: #fff;
        white-space: nowrap;
        &:hover{
            background-color: ${props => props.theme.accentColor};
        }
    }
`;

const ErrorMessage = styled.span`
    display: flex;
    justify-content: center;
    color: ${props => props.theme.textColor};
`;

const SettingMenu = styled.div`

`;

const Ul = styled.ul`
`;

const Li = styled.li`
`;

const FileInput = styled.input`
    display: none;
`;

const UserProfile = () => {
    const [userLoading, { loginUserId }] = useLoginInfo();
    const { userid } = useParams();
    const { onError } = useError();
    const queryClient = useQueryClient();
    const naviagate = useNavigate();
    const [edit, setEdit] = useState(false);
    const [setting, setSetting] = useState(false);
    const onSuccess = () => queryClient.invalidateQueries(["userProfile", userid]);

    // userInfo 데이터
    const { isLoading, data: response } = useQuery(["userProfile", userid], () => getUserProfile(userid), { onError, retry: 3, retryDelay: 600 });
    const { userId: profileUser, img_url, img_name, description, nickname, snsId }: Iprofile = response?.data ?? {};
    const { postCount, commentCount }: IActivityCount = response?.activityCount ?? {};

    // 회원탈퇴
    const { mutate: deleteUserMutate } = useMutation(deleteUser, { onError });
    const onDeleteUser = () => {
        Swal.fire({
            title: "정말 회원탈퇴 하시겠습니까?",
            icon: "question",
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                deleteUserMutate({ loginUserId })
            },
            allowOutsideClick: () => !Swal.isLoading()
        })
            .then((result) => result.value ? Swal.fire({ title: "탈퇴 성공!", icon: "success" }) : null)
            .then(() => naviagate("/"));
    }
    // edit description
    const { register, handleSubmit, formState: { errors } } = useForm<{ userDescription: string }>();
    const { mutate: editInfo } = useMutation((userDescription: string) => editDescription(userDescription, userid), { onSuccess, onError });
    const onVaild = ({ userDescription }: { userDescription: string }) => {
        editInfo(userDescription)
        setEdit(prev => !prev);
    };

    // edit Profile
    const { mutate: userImage } = useMutation(uploadUserProfile, { onSuccess, onError });
    const onUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.files) {
            const file = event.currentTarget.files[0];
            console.log(file);
            userImage({ file, loginUserId });
        }
    };
    return (
        <>
            <Header />
            {isLoading ? <Spinner isLoading={isLoading} /> : (
                <Grid>
                    <TopNav>
                        <BackPageIcon />
                        {userid == loginUserId ? <FontAwesomeIcon onClick={() => setSetting(prev => !prev)} icon={faGear} /> : null}
                        {/* 프로필 사진 변경, 비밀번호 변경, 회원 탈퇴 */}
                    </TopNav>
                    <ProfileImg>
                        {img_url ? <img src={img_url} alt={img_name} /> : <FontAwesomeIcon icon={faPerson} />}
                    </ProfileImg>
                    <UserDescription>
                        <span>
                            {userid == loginUserId ? <FontAwesomeIcon onClick={() => setEdit(prev => !prev)} icon={faPenToSquare} /> : null}
                            <h2>{nickname}</h2>
                        </span>
                        {!edit ? <p>{description}</p> : (
                            <EditForm onSubmit={handleSubmit(onVaild)}>
                                <textarea defaultValue={description} {...register("userDescription", {
                                    maxLength: {
                                        value: 50000,
                                        message: "최대 50000자까지 가능합니다."
                                    }
                                }
                                )} />
                                <button>수정</button>
                            </EditForm>
                        )}
                    </UserDescription>
                    <ErrorMessage>{errors?.userDescription?.message}</ErrorMessage>
                    <UserActivitySection>
                        <span>threadNum : {postCount} </span>
                        <span>commentNum : {commentCount}</span>
                    </UserActivitySection>
                </Grid>
            )}
            {!setting ? null : (
                <>
                    <SettingMenu>
                        <Ul>
                            <Li><label htmlFor="fileInput">사진 변경</label></Li>
                            <Li><Link to="/user/change-password">비밀번호 변경</Link></Li>
                            <Li><Link to="" onClick={onDeleteUser}>회원 탈퇴</Link></Li>
                        </Ul>
                    </SettingMenu>
                    <FileInput type="file" id="fileInput" onChange={onUploadImage} accept="image/*" name="userImageFile" />
                </>
            )}
        </>
    );
};

export default memo(UserProfile);