import styled from 'styled-components';

import { ErrorType } from '../lib/interfaces/Error';
import ErrorComponent from './ErrorComponent';

interface IErrors {
    errors: ErrorType[];
}

const Errors = ({ errors }: IErrors) => {
    return (
        <StyledContainer>
            {errors.map((error, id) => (
                <ErrorComponent
                    key={`error-${id}-${error.msg}`}
                    error={error}
                />
            ))}
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export default Errors;
