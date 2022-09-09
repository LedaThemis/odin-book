import { ErrorType } from './interfaces/Error';

const constructError = (errorMessage: string): ErrorType => {
    return {
        value: '',
        msg: errorMessage,
        param: '',
        location: '',
    };
};

export default constructError;
