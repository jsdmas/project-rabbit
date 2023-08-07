import styled from 'styled-components';

export const Wrapper = styled.section`
  margin: auto;
  margin-top: 8vh;
  color: ${(props) => props.theme.textColor};
  padding: 0px 1em;
  height: 350px;
  max-width: 600px;
`;

export const Head = styled.header`
  display: flex;
  justify-content: space-between;
  span {
    font-family: 'Noto Sans KR', sans-serif;
    place-self: center center;
    font-size: 1.2em;
    color: ${(props) => props.theme.buttonColor};
    svg {
      font-size: 1.5em;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 100%;
  margin-top: 5vh;
  color: ${(props) => props.theme.textColor};
`;

export const TitleInput = styled.input`
  width: 100%;
  height: 10%;
  background-color: ${(props) => props.theme.postColor};
  border: 1px solid ${(props) => props.theme.accentColor};
  border-radius: 5px;
  color: ${(props) => props.theme.textColor};
`;

export const ContentTextArea = styled.textarea`
  height: 50%;
  width: 100%;
  resize: none;
  background-color: ${(props) => props.theme.postColor};
  border: 1px solid ${(props) => props.theme.accentColor};
  border-radius: 5px;
  color: ${(props) => props.theme.textColor};
`;

export const SubmitButton = styled.button`
  margin: auto;
  width: 50%;
  color: #fff;
  background-color: ${(props) => props.theme.buttonColor};
  border: none;
  border-radius: 5px;
  height: 10%;
  cursor: pointer;
`;

export const ErrorMessage = styled.span`
  color: ${(props) => props.theme.accentColor};
  height: 3%;
  font-size: 1em;
`;

export const ImgDiv = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  font-size: 0.8em;
  margin: 2vh 0;
`;

export const ImgInput = styled.input`
  display: none;
`;

export const Label = styled.label`
  background-color: ${(props) => props.theme.buttonColor};
  border-radius: 5px;
  color: #fff;
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
`;
export const SelectImgInfo = styled.div`
  white-space: nowrap;
  padding-left: 5%;
  display: flex;
  align-items: center;
  width: 70%;
`;
