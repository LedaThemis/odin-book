import { AxiosError } from 'axios';

import constructErrorResponse from '../constructErrorResponse';
import handleError from '../handleError';
import { ErrorResponse } from '../interfaces/Error';

test('should work with AxiosError if server responded with data', () => {
    const responseErrorText = 'An error occurred! (came from server)';

    const axiosError = new AxiosError('An error occurred!');
    axiosError.response = {
        status: 404,
        statusText: '',
        data: constructErrorResponse(responseErrorText),
        headers: {
            '': '',
        },
        config: {},
    };

    expect(handleError(axiosError)).toEqual<ErrorResponse>(
        constructErrorResponse(responseErrorText),
    );
});

test('should work with AxiosError if server responded with status code', () => {
    const errorMessage = 'An error occurred!';
    const statusCode = 404;

    const axiosError = new AxiosError(errorMessage);
    axiosError.response = {
        status: statusCode,
        statusText: '',
        data: undefined,
        headers: {
            '': '',
        },
        config: {},
    };

    expect(handleError(axiosError)).toEqual<ErrorResponse>(
        constructErrorResponse(
            `${errorMessage} | Server responded with status code ${statusCode}`,
        ),
    );
});

test('should work with AxiosError if server did not respond', () => {
    const errorMessage = 'An error occurred!';

    const axiosError = new AxiosError(errorMessage);

    expect(handleError(axiosError)).toEqual<ErrorResponse>(
        constructErrorResponse(errorMessage),
    );
});

test('should work with string', () => {
    const errorMessage = 'An error occurred!';

    expect(handleError(errorMessage)).toEqual<ErrorResponse>(
        constructErrorResponse(errorMessage),
    );
});

test('should work with Error', () => {
    const errorMessage = 'An error occurred!';
    const error = new Error(errorMessage);

    expect(handleError(error)).toEqual<ErrorResponse>(
        constructErrorResponse(errorMessage),
    );
});

test('should respond with generic response on undefined or empty object', () => {
    const genericErrorResponse =
        'An unknown error occurred, check console for more details.';

    expect(handleError({})).toEqual<ErrorResponse>(
        constructErrorResponse(genericErrorResponse),
    );

    expect(handleError(undefined)).toEqual<ErrorResponse>(
        constructErrorResponse(genericErrorResponse),
    );
});
