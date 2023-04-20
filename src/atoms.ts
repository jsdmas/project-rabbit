import { atom } from "recoil";

export enum OrderCommends {
    "p.created" = "p.created",
    "p.like" = "p.like"
}

export enum OrderBy {
    "DESC" = "DESC",
    "ASC" = "ASC"
}

export enum SearchOption {
    "Thread" = "content",
    "User" = "user",
    "Title" = "title",
    "none" = "none"
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

export const keywordOptionState = atom<SearchOption>({
    key: "keywordOption",
    default: SearchOption.none
});

export const searchKeywordState = atom<null | string>({
    key: "searchKeyword",
    default: null
});

export const errorMessageState = atom({
    key: "errorMessageState",
    default: ""
});
