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

export const likeIncrementTimeState = atom<Date | null>({
    key: "likeIncrementTime",
    default: null,
});
