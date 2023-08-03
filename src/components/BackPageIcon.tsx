import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ButtonStyle = styled.span`
  cursor: pointer;
  color: ${(props) => props.theme.textColor};
  font-size: 1.3em;
`;

const BackPageIcon = () => {
  const backSpace = useNavigate();

  return (
    <ButtonStyle>
      <FontAwesomeIcon icon={faLeftLong} onClick={() => backSpace(-1)} />
    </ButtonStyle>
  );
};

export default BackPageIcon;
