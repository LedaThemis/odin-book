import { rest } from 'msw';

import { IPost } from '../lib/interfaces/Post';
import { IUser } from '../lib/interfaces/User';

const genericUser: IUser = {
    _id: '0',
    id: '0',
    displayName: 'Generic User',
    friends: [],
    photoURL: 'photoURL',
    incomingFriendRequests: [],
    custom: {
        photoURL: '',
    },
    createdAt: new Date('2000-01-01').toLocaleString(),
    updatedAt: new Date('2000-01-01').toLocaleString(),
};

const genericPost: IPost = {
    _id: '0',
    content: 'This is a generic post',
    photos: [],
    likes: [],
    comments: [],
    author: genericUser,
    createdAt: new Date('2000-01-01').toLocaleString(),
    updatedAt: new Date('2000-01-01').toLocaleString(),
};

export const handlers = [
    rest.post<{ content: string; photos: string[] }>(
        'posts',
        async (req, res, ctx) => {
            const body = await req.json();

            console.log('got called');

            return res(
                ctx.json({
                    state: 'success',
                    post: {
                        ...genericPost,
                        content: body.content,
                        photos: body.photos,
                    },
                }),
            );
        },
    ),
];
