import { MoonLoader } from 'react-spinners';
import styled from 'styled-components';

interface IFetchingOverlay {
    children: React.ReactNode;
    isFetching: boolean;
    text?: string;
}

/**
 * HOC to supply a loading overlay based on condition
 */
const FetchingOverlay = ({ children, text, isFetching }: IFetchingOverlay) => {
    if (isFetching) {
        return (
            <StyledLoadingContainer>
                <MoonLoader />
                {text && <p>{text}</p>}
            </StyledLoadingContainer>
        );
    } else {
        return <>{children}</>;
    }
};

const StyledLoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`;

export default FetchingOverlay;
