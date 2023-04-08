export type TTreadId = {
    threadid: string
};

export interface IThreadList {
    title: string
    content: string
    created: string
    img_name?: string
    img_url?: string
    like?: number
    modified?: string
    post_id: number
    user_id?: number
    nickname?: string
    userimg?: string
    commentCnt: number
};

export interface IThreadData {
    postId: number
    postTitle: string
    postWriteUser: string
    postContent: string
    postCreated: string
    postLike: number
    postImg?: string
    postImgName?: string
    postModified?: string
    postWriteUserImgUrl?: string
}

export interface IResponse {
    commentData: IcommentData[]
    data: IThreadData[]
    pubdate: string
    rt: string
    rtcode: number
    rtmsg: string
}

export interface IcommentData {
    commentId: number
    commentContent: string
    commentCreated: string
    commentLike: number
    commentWriteUser?: string
    commentModified?: string
    commentParentNum?: number
    commentWriteUserImgUrl?: string
    inside?: string
};

export interface IpostCommentData {
    commentContent: string
    commentWriteUser?: string
};


export interface IpostData {
    postTitle: string
    postContent: string
    postImgUrl?: string
    postImgName?: string
};
