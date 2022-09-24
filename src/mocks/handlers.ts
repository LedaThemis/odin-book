import { rest } from 'msw';

import { IChatRoom } from '../lib/interfaces/ChatRoom';
import { IComment } from '../lib/interfaces/Comment';
import { IMessage } from '../lib/interfaces/Message';
import { IPost } from '../lib/interfaces/Post';
import { IUser } from '../lib/interfaces/User';

export const genericUser: IUser = {
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

const genericCurrentUser: IUser = {
    ...genericUser,
    displayName: 'Current User',
};

export const genericPost: IPost = {
    _id: '0',
    content: 'This is a generic post',
    photos: [],
    likes: [],
    comments: [],
    author: genericUser,
    createdAt: new Date('2000-01-01').toLocaleString(),
    updatedAt: new Date('2000-01-01').toLocaleString(),
};

const genericComment: IComment = {
    _id: '0',
    author: genericUser,
    content: 'This is a generic comment',
    createdAt: new Date('2000-01-01').toLocaleString(),
    updatedAt: new Date('2000-01-01').toLocaleString(),
};

export const genericChatRoom: IChatRoom = {
    _id: '0',
    messages: [],
    members: [],
    createdAt: new Date('2000-01-01').toLocaleString(),
    updatedAt: new Date('2000-01-01').toLocaleString(),
};

const genericMessage: IMessage = {
    _id: '0',
    author: genericUser,
    content: 'This is a generic message',
    attachments: [],
};

const authHandlers = [
    rest.post('logout', (req, res, ctx) => {
        return res(
            ctx.json({
                state: 'success',
            }),
        );
    }),
];

const usersHandlers = [
    rest.get('me', (req, res, ctx) => {
        return res(
            ctx.json({
                user: genericCurrentUser,
            }),
        );
    }),
    rest.post<{ photoURL: string }>('me', async (req, res, ctx) => {
        const body = await req.json();

        return res(
            ctx.json({
                state: 'success',
                user: {
                    ...genericCurrentUser,
                    custom: {
                        photoURL: body.photoURL,
                    },
                },
            }),
        );
    }),
    rest.get('guests', (req, res, ctx) => {
        return res(
            ctx.json({
                state: 'success',
                users: [],
            }),
        );
    }),
    rest.post('guests', (req, res, ctx) => {
        return res(
            ctx.json({
                state: 'success',
            }),
        );
    }),
    rest.get('incoming', (req, res, ctx) => {
        return res(
            ctx.json({
                state: 'success',
                users: [],
            }),
        );
    }),
    rest.get('outgoing', (req, res, ctx) => {
        return res(
            ctx.json({
                state: 'success',
                users: [],
            }),
        );
    }),
    rest.get('people', (req, res, ctx) => {
        const nextCursor = req.url.searchParams.get('cursor');

        return res(
            ctx.json({
                state: 'success',
                users: [],
                nextCursor,
            }),
        );
    }),
    rest.get('users/search', (req, res, ctx) => {
        return res(
            ctx.json({
                state: 'success',
                users: [],
            }),
        );
    }),
    rest.get<Record<string, never>, { userId: string }>(
        'users/:userId',
        (req, res, ctx) => {
            return res(
                ctx.json({
                    state: 'success',
                    user: { ...genericUser, _id: req.params.userId },
                }),
            );
        },
    ),
    rest.get<Record<string, never>, { userId: string }>(
        'users/:userId/posts',
        (req, res, ctx) => {
            return res(
                ctx.json({
                    state: 'success',
                    posts: [],
                }),
            );
        },
    ),
    rest.get<Record<string, never>, { userId: string }>(
        'users/:userId/friends',
        (req, res, ctx) => {
            return res(
                ctx.json({
                    state: 'success',
                    users: [],
                }),
            );
        },
    ),
    rest.post<Record<string, never>, { userId: string }>(
        'users/:userId/friend',
        (req, res, ctx) => {
            return res(
                ctx.json({
                    state: 'success',
                    user: { ...genericUser, _id: req.params.userId },
                }),
            );
        },
    ),
    rest.delete<Record<string, never>, { userId: string }>(
        'users/:userId/friend',
        (req, res, ctx) => {
            return res(
                ctx.json({
                    state: 'success',
                    user: genericCurrentUser,
                }),
            );
        },
    ),
];

const postsHandlers = [
    rest.get('timeline', (req, res, ctx) => {
        const nextCursor = req.url.searchParams.get('cursor');

        return res(
            ctx.json({
                state: 'success',
                posts: [],
                nextCursor,
            }),
        );
    }),

    rest.post<{ content: string; photos: string[] }>(
        'posts',
        async (req, res, ctx) => {
            const body = await req.json();

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
    rest.post<{ content: string; photos: string[] }, { postId: string }>(
        'posts/:postId',
        async (req, res, ctx) => {
            const body = await req.json();

            return res(
                ctx.json({
                    state: 'success',
                    post: {
                        ...genericPost,
                        _id: req.params.postId,
                        content: body.content,
                        photos: body.photos,
                    },
                }),
            );
        },
    ),
    rest.get<Record<string, never>, { postId: string }>(
        'posts/:postId/likes',
        (req, res, ctx) => {
            return res(
                ctx.json({
                    state: 'success',
                    users: [],
                }),
            );
        },
    ),
    rest.post<Record<string, never>, { postId: string }>(
        'posts/:postId/like',
        (req, res, ctx) => {
            return res(
                ctx.json({
                    state: 'success',
                    post: { ...genericPost, _id: req.params.postId },
                }),
            );
        },
    ),
    rest.delete<Record<string, never>, { postId: string }>(
        'posts/:postId/like',
        (req, res, ctx) => {
            return res(
                ctx.json({
                    state: 'success',
                    post: { ...genericPost, _id: req.params.postId },
                }),
            );
        },
    ),
    rest.post<{ content: string }, { postId: string }>(
        'posts/:postId/comments',
        async (req, res, ctx) => {
            const body = await req.json();

            return res(
                ctx.json({
                    state: 'success',
                    post: {
                        ...genericPost,
                        _id: req.params.postId,
                        comments: [
                            { ...genericComment, content: body.content },
                        ],
                    },
                }),
            );
        },
    ),

    rest.delete<Record<string, never>, { postId: string }>(
        'posts/:postId',
        (req, res, ctx) => {
            return res(
                ctx.json({
                    state: 'success',
                    postId: req.params.postId,
                }),
            );
        },
    ),
    rest.delete<Record<string, never>, { postId: string; commentId: string }>(
        'posts/:postId/comments/:commentId',
        (req, res, ctx) => {
            return res(
                ctx.json({
                    state: 'success',
                    post: { ...genericPost, _id: req.params.postId },
                }),
            );
        },
    ),
];

const commentsHandlers = [
    rest.post<{ content: string }, { commentId: string }>(
        'comments/:commentId',
        async (req, res, ctx) => {
            const body = await req.json();

            return res(
                ctx.json({
                    state: 'success',
                    comment: {
                        ...genericComment,
                        _id: req.params.commentId,
                        content: body.content,
                    },
                }),
            );
        },
    ),
];

const chatHandlers = [
    rest.get('chat/conversations', (req, res, ctx) => {
        return res(
            ctx.json({
                state: 'success',
                conversations: [],
            }),
        );
    }),
    rest.post<{ userId: string }>(
        'chat/conversations',
        async (req, res, ctx) => {
            const body = await req.json();

            return res(
                ctx.json({
                    state: 'success',
                    room: {
                        ...genericChatRoom,
                        members: [
                            {
                                ...genericUser,
                                _id: body.userId,
                            },
                        ],
                    },
                }),
            );
        },
    ),
    rest.get<Record<string, never>, { roomId: string }>(
        'chat/rooms/:roomId',
        (req, res, ctx) => {
            return res(
                ctx.json({
                    state: 'success',
                    room: { ...genericChatRoom, _id: req.params.roomId },
                }),
            );
        },
    ),
    rest.get<Record<string, never>, { roomId: string }>(
        'chat/rooms/:roomId/messages',
        (req, res, ctx) => {
            return res(
                ctx.json({
                    state: 'success',
                    messages: [],
                }),
            );
        },
    ),
    rest.post<{ content: string; attachments: string[] }, { roomId: string }>(
        'chat/rooms/:roomId/messages',
        async (req, res, ctx) => {
            const body = await req.json();

            return res(
                ctx.json({
                    state: 'success',
                    message: {
                        ...genericMessage,
                        content: body.content,
                        attachments: body.attachments,
                    },
                }),
            );
        },
    ),
    rest.delete<Record<string, never>, { roomId: string; messageId: string }>(
        'chat/rooms/:roomId/messages/:messageId',
        (req, res, ctx) => {
            return res(
                ctx.json({
                    state: 'success',
                }),
            );
        },
    ),
];

export const handlers = authHandlers.concat(
    usersHandlers,
    postsHandlers,
    commentsHandlers,
    chatHandlers,
);
