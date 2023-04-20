export interface IPostJoin {
    email: string
    password: string
    confirm?: string
    nickname: string
};

export interface ILogin {
    email: string
    password: string
}

export interface IUserState {
    loginState: boolean
    loginUserId?: number
    loginUserSnsId?: number
}

export type IUser = [
    isLoading: boolean,
    userState: IUserState
];