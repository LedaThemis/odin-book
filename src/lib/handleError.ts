import constructError from './constructError';
import { ErrorResponse } from './interfaces/Error';

const handleError = (e: any): ErrorResponse => {
    if (e.response) {
        return e.response.data;
    }

    return {
        state: 'failed',
        errors: [constructError(e)],
    };
};

export default handleError;
