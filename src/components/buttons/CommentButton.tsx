import { VscComment } from 'react-icons/vsc';

import BaseButton from './BaseButton';

interface ICommentButton {
    onClick: () => void;
}

const CommentButton = ({ onClick }: ICommentButton) => {
    return <BaseButton Icon={VscComment} text="Comment" onClick={onClick} />;
};

export default CommentButton;
