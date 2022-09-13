import hasCustomField from './hasCustomField';
import { IAnyUser } from './interfaces/User';

function getOverrideField(user: IAnyUser, fieldName: keyof IAnyUser['custom']) {
    if (hasCustomField(user, fieldName)) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return user.custom[fieldName]!;
    } else {
        return user[fieldName];
    }
}

export default getOverrideField;
