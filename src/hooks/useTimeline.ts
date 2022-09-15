import { useEffect, useState } from 'react';

import { useSocket } from '../context/SocketProvider';
import { IPost } from '../lib/interfaces/Post';

const useTimeline = () => {
    const socket = useSocket();
    const [posts, setPosts] = useState<IPost[]>([]);

    useEffect(() => {
        socket.on('timeline', (post: IPost) => {
            setPosts((prevPosts) => [post].concat(prevPosts));
        });

        return () => {
            socket.off('timeline');
        };
    }, []);

    return { posts };
};

export default useTimeline;
