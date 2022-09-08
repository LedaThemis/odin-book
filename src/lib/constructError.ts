import { ErrorType } from './interfaces/Error';

const constructError = (e: any): ErrorType => {
    let msg;

    if (e.message) {
        msg = e.message;
    } else {
        msg = e;
    }

    return {
        value: '',
        msg,
        param: '',
        location: '',
    };
};

export default constructError;
