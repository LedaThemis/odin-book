import styled from 'styled-components';

import { ErrorType } from '../lib/interfaces/Error';

interface IError {
    error: ErrorType;
}

const ErrorComponent = ({ error }: IError) => {
    return <StyledP>* {error.msg}</StyledP>;
};

const StyledP = styled.p`
    color: red;
    margin: 0;
    text-align: left;
`;

export default ErrorComponent;
