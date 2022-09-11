import { FaRegThumbsUp } from 'react-icons/fa';

import BaseButton from './BaseButton';

interface ILikeButton {
    onClick: () => void;
}

const LikeButton = ({ onClick }: ILikeButton) => {
    return <BaseButton Icon={FaRegThumbsUp} text="Like" onClick={onClick} />;
};

export default LikeButton;
