import { IPost } from './interfaces/Post';
import { IUser } from './interfaces/User';

const isPostLiked = (post: IPost, user: IUser) => post.likes.includes(user._id);

export default isPostLiked;
