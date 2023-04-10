import { atom } from "recoil";

// 하드코딩의 실수를 줄이기위해 enum 사용
export enum OrderCommends {
    "p.created" = "p.created",
    "p.like" = "p.like"
}

export enum OrderBy {
    "DESC" = "DESC",
    "ASC" = "ASC"
}

export enum SearchOption {
    "Thread" = "post",
    "User" = "user"
}

export const orderCommendState = atom<OrderCommends>({
    key: "orderCommend",
    default: OrderCommends["p.created"],
});

export const orderbyState = atom<OrderBy>({
    key: "orderby",
    default: OrderBy.DESC,
});

export const darkState = atom({
    key: "isdark",
    default: false
});

export const replyState = atom<number | null>({
    key: "reply",
    default: null
});



