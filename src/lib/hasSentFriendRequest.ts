import { IAnyUser } from './interfaces/User';

const hasSentFriendRequest = (recipient: IAnyUser, sender: IAnyUser) =>
    recipient.incomingFriendRequests.includes(sender._id);

export default hasSentFriendRequest;
