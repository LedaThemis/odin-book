import { FaRegThumbsUp } from 'react-icons/fa';

import BaseButton from './BaseButton';

interface ILikeButton {
    onClick: () => void;
    isLiked: boolean;
}

const LikeButton = ({ onClick, isLiked }: ILikeButton) => {
    return (
        <BaseButton
            color={isLiked ? 'var(--primary-color)' : undefined}
            Icon={FaRegThumbsUp}
            text="Like"
            onClick={onClick}
        />
    );
};

export default LikeButton;
