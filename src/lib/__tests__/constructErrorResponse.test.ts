import constructError from '../constructError';
import constructErrorResponse from '../constructErrorResponse';
import { ErrorResponse } from '../interfaces/Error';

test('should work when provided with string', () => {
    const errorString = 'An error occurred!';

    expect(constructErrorResponse(errorString)).toEqual<ErrorResponse>({
        state: 'failed',
        errors: [constructError(errorString)],
    });
});

test('should work when provided with error response', () => {
    // TODO: this looks pointless?
    const errorResponse = {
        state: 'failed',
        errors: [constructError('An error occurred!')],
    } as ErrorResponse;

    expect(constructErrorResponse(errorResponse)).toEqual<ErrorResponse>(
        errorResponse,
    );
});
