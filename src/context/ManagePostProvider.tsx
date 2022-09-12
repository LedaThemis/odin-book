import { createContext, useContext } from 'react';

import { IPost } from '../lib/interfaces/Post';

const initialValue = {
    updatePostInState: () => {
        return;
    },
    deletePostFromState: () => {
        return;
    },
};

interface IManagePostContext {
    updatePostInState: (post: IPost) => void;
    deletePostFromState: () => void;
}

const ManagePostContext = createContext<IManagePostContext>(initialValue);

const useManagePost = () => useContext(ManagePostContext);

export { useManagePost, ManagePostContext };
