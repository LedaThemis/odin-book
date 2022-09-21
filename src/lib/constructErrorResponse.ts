import constructError from './constructError';
import { ErrorResponse } from './interfaces/Error';

const constructErrorResponse = (e: string | ErrorResponse): ErrorResponse => {
    if (typeof e === 'string') {
        return {
            state: 'failed',
            errors: [constructError(e)],
        };
    } else {
        return e;
    }
};

export default constructErrorResponse;
