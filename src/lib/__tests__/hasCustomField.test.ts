import hasCustomField from '../hasCustomField';
import { IAnyUser } from '../interfaces/User';

test('should return true if custom field exists', () => {
    const user = {
        photoURL: 'default',
        custom: {
            photoURL: 'custom',
        },
    } as IAnyUser;

    expect(hasCustomField(user, 'photoURL')).toBe(true);
});

test('should return false if custom field is empty', () => {
    const user = {
        photoURL: 'default',
        custom: {
            photoURL: '',
        },
    } as IAnyUser;

    expect(hasCustomField(user, 'photoURL')).toBe(false);
});
