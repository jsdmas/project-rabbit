export interface Iprofile {
  description?: string;
  img_name?: string;
  img_url?: string;
  nickname: string;
  userId: number;
  snsId?: string;
}

export interface IActivityCount {
  commentCount: number;
  postCount: number;
}

export interface IUserEdit {
  userDescription: string;
}

export interface IPassword {
  currentPW: string;
  changePW: string;
  changePWCompare: string;
}

export interface IPasswordChange {
  currentPW: string;
  changePW: string;
  loginUserId?: number;
}
