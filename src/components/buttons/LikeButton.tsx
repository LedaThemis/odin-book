import { AiFillLike, AiOutlineLike } from 'react-icons/ai';

import BaseButton from './BaseButton';

interface ILikeButton {
    onClick: () => void;
    isLiked: boolean;
}

const LikeButton = ({ onClick, isLiked }: ILikeButton) => {
    return (
        <BaseButton
            color={isLiked ? 'var(--primary-color)' : undefined}
            Icon={isLiked ? AiFillLike : AiOutlineLike}
            text="Like"
            onClick={onClick}
        />
    );
};

export default LikeButton;
