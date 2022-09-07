export interface IUser {
    _id: string;
    id: string;
    displayName: string;
    photoURL: string;
    friends: string[];
    createdAt: Date;
    updatedAt: Date;
}
