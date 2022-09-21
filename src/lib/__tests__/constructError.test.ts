import constructError from '../constructError';
import { ErrorType } from '../interfaces/Error';

test('should return correct error form', () => {
    const errorMessage = 'an error occurred!';

    expect(constructError(errorMessage)).toEqual<ErrorType>({
        value: '',
        msg: errorMessage,
        param: '',
        location: '',
    });
});
