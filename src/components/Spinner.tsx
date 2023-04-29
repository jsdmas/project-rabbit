import { memo } from 'react';
import { ColorRing } from "react-loader-spinner";
import styled from 'styled-components';


const Wrapper = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
`;

const Spinner = ({ isLoading }: { isLoading?: boolean }) => {

    return (
        <Wrapper>
            <ColorRing
                visible={isLoading}
                height="150"
                width="150"
                ariaLabel="blocks-loading"
                wrapperClass="blocks-wrapper"
                colors={["#393E46", "#00ADB5", "#057D83", "#3F72AF", "#284B75"]}
            />
        </Wrapper>
    );
}

export default memo(Spinner);
