import { createContext, useContext } from 'react';

import { IPost } from '../lib/interfaces/Post';

const initialValue = {
    addPostToState: () => {
        return;
    },
    updatePostInState: () => {
        return;
    },
    deletePostFromState: () => {
        return;
    },
};

interface IManagePostContext {
    addPostToState: (post: IPost) => void;
    updatePostInState: (post: IPost) => void;
    deletePostFromState: () => void;
}

const ManagePostContext = createContext<IManagePostContext>(initialValue);

const useManagePost = () => useContext(ManagePostContext);

export { useManagePost, ManagePostContext };
