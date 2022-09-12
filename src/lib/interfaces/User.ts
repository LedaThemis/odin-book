interface IBaseUser {
    _id: string;
    id: string;
    displayName: string;
    photoURL: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUser extends IBaseUser {
    friends: string[];
}

export interface IPopulatedUser extends IBaseUser {
    friends: IUser[];
}

export type IAnyUser = IPopulatedUser | IUser;
