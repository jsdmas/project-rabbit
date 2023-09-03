import { faCheck, faImage, faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { createThread } from '@/api/threadApi';
import BackPageIcon from '@/components/BackPageIcon';
import Header from '@/components/header/Header';
import RegexHelper from '@/helper/RegexHelper';
import Meta from '@/Meta';
import {
  ContentTextArea,
  ErrorMessage,
  Form,
  Head,
  ImgDiv,
  ImgInput,
  Label,
  SelectImgInfo,
  SubmitButton,
  TitleInput,
  Wrapper,
} from '@/styles/writeBase';
import { IpostData } from '@/types/thread';

const Write = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IpostData>();
  const navigate = useNavigate();
  const onVaild = async (postData: IpostData) => {
    const { data: response } = await createThread(postData);

    navigate(`/thread/${response}`);
  };

  return (
    <>
      <Meta title="글쓰기 | Rabbit" description="Rabbit 사이트 글 작성 페이지입니다." />
      <Header />
      <Wrapper>
        <Head>
          <BackPageIcon />
          <span>Write</span>
        </Head>
        <Form onSubmit={handleSubmit(onVaild)}>
          <TitleInput
            {...register('postTitle', {
              required: '제목은 반드시 적어야 합니다.',
              maxLength: {
                value: 50,
                message: '제목은 최대 50글자입니다.',
              },
              minLength: {
                value: 1,
                message: '최소 1글자 이상적어야 합니다.',
              },
              validate: {
                RegexValue: (title) =>
                  RegexHelper.value(title) ? true : '제목을 올바르게 적어주세요',
              },
            })}
            placeholder="Title..."
          />
          <ErrorMessage>{errors?.postTitle?.message}</ErrorMessage>
          <ImgDiv>
            <Label htmlFor="writeThreadImg">
              <FontAwesomeIcon icon={faPencil} />
              &nbsp;이미지 편집
            </Label>
            <SelectImgInfo>
              <FontAwesomeIcon icon={faImage} />
              &nbsp;선택된 이미지 : {watch('postImg')?.[0]?.name}{' '}
            </SelectImgInfo>
            <ImgInput id="writeThreadImg" type="file" {...register('postImg')} accept="image/*" />
          </ImgDiv>
          <ContentTextArea
            {...register('postContent', {
              required: '본문은 반드시 적어야 합니다.',
              maxLength: {
                value: 1000000,
                message: '본문은 최대 1000000글자입니다.',
              },
              minLength: {
                value: 1,
                message: '최소 1글자 이상적어야 합니다.',
              },
              validate: {
                RegexValue: (content) =>
                  RegexHelper.value(content) ? true : '본문을 올바르게 적어주세요',
              },
            })}
            placeholder="Content..."
          />
          <ErrorMessage>{errors?.postContent?.message}</ErrorMessage>
          <SubmitButton type="submit">
            <FontAwesomeIcon icon={faCheck} /> 완료
          </SubmitButton>
        </Form>
      </Wrapper>
    </>
  );
};

export default Write;
