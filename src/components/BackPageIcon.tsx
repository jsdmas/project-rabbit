import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ButtonStyle = styled.span`
    cursor: pointer;
    color: ${props => props.theme.buttonColor};
    font-size: 1.5em;
`;

const BackPageIcon = () => {
    const backSpace = useNavigate();
    return <ButtonStyle><FontAwesomeIcon icon={faLeftLong} onClick={() => backSpace(-1)} /></ButtonStyle>
};

export default BackPageIcon;