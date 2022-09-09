import { AxiosError } from 'axios';

import constructError from './constructError';
import { ErrorResponse } from './interfaces/Error';

const constructErrorResponse = (errorMessage: string): ErrorResponse => ({
    state: 'failed',
    errors: [constructError(errorMessage)],
});

const handleError = (e: unknown): ErrorResponse => {
    console.error(e);

    if (e instanceof AxiosError) {
        if (e.response) {
            if (e.response.data) {
                return e.response.data;
            } else {
                return constructErrorResponse(
                    `${e.message} | Server responded with status code ${e.response.status}`,
                );
            }
        } else if (e.request) {
            return constructErrorResponse(
                `${e.message} | An error occurred while communicating with server, try again.`,
            );
        } else {
            return constructErrorResponse(e.message);
        }
    } else if (typeof e === 'string') {
        return constructErrorResponse(e);
    } else if (e instanceof Error) {
        return constructErrorResponse(e.message);
    } else {
        return constructErrorResponse(
            'An unknown error occurred, check console for more details.',
        );
    }
};

export default handleError;
