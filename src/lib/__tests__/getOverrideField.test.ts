import getOverrideField from '../getOverrideField';
import { IAnyUser } from '../interfaces/User';

test('should return default avatar if no custom is specified', () => {
    const avatarURL = 'https://example.com';
    const user = {
        photoURL: avatarURL,
        custom: {
            photoURL: '',
        },
    } as IAnyUser;

    expect(getOverrideField(user, 'photoURL')).toBe(avatarURL);
});

test('should return custom avatar if specified', () => {
    const customAvatarURL = 'https://example.com';
    const user = {
        photoURL: 'defaultURL',
        custom: {
            photoURL: customAvatarURL,
        },
    } as IAnyUser;

    expect(getOverrideField(user, 'photoURL')).toBe(customAvatarURL);
});
