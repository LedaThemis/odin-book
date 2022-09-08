export type ErrorType = {
    value: string;
    msg: string;
    param: string;
    location: string;
};

export interface ErrorResponse {
    state: 'failed';
    errors: ErrorType[];
}
