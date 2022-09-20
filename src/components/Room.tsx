import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import useChatRoom from '../hooks/useChatRoom';
import FetchingOverlay from './HOCs/FetchingOverlay';
import RoomHeader from './RoomHeader';
import RoomMessageBar from './RoomMessageBar';
import RoomMessages from './RoomMessages';

const Room = () => {
    const params = useParams();
    const roomQuery = useChatRoom(`${params.roomId}`);

    return (
        <StyledContainer>
            <FetchingOverlay isFetching={roomQuery.isLoading}>
                {roomQuery.isSuccess && (
                    <>
                        <RoomHeader room={roomQuery.data} />
                        <RoomMessages roomId={roomQuery.data._id} />
                        <RoomMessageBar roomId={roomQuery.data._id} />
                    </>
                )}
            </FetchingOverlay>
        </StyledContainer>
    );
};

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

export default Room;
