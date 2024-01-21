export type User = { 
    id: number,
    email: string,
    name: string,
    profilePicture: string,
    password: string,
    friends?: User[],
    friendsOf?: User[]
}

export type FriendRequest = { 
    id: number,
    time: Date,
    userID: number,
    SendingUser?: User,
    RecievingUserID: number,
    RecievingUser?: User
}

export type Message = { 
    id: number;
    time: Date;
    authorID: number;
    author?: User;
    recievingUserID: number;
    RecievingUser?: User
    content: string,
    parentMessageID?: number,
    parentMessage?: Message,
    replyMessages?: Message[]
}