import { IAnyUser } from './interfaces/User';

const hasCustomField = (
    user: IAnyUser,
    customField: keyof IAnyUser['custom'],
) =>
    user.custom &&
    customField in user.custom &&
    user.custom[customField] !== '';

export default hasCustomField;
