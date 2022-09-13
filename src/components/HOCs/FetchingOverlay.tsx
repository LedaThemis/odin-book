import { MoonLoader } from 'react-spinners';
import styled from 'styled-components';

import { ErrorType } from '../../lib/interfaces/Error';
import Errors from '../Errors';

interface IFetchingOverlay {
    children: React.ReactNode;
    isFetching: boolean;
    text?: string;
    errors?: ErrorType[];
}

/**
 * HOC to supply a loading overlay based on condition
 */
const FetchingOverlay = ({
    children,
    text,
    isFetching,
    errors,
}: IFetchingOverlay) => {
    if (errors && errors.length > 0) {
        return <Errors errors={errors} />;
    }

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
