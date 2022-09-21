import { IPost } from './interfaces/Post';
import { IAnyUser } from './interfaces/User';

const isPostLiked = (post: IPost, user: IAnyUser) =>
    post.likes.includes(user._id);

export default isPostLiked;
