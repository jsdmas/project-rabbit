import { atom } from "recoil";

export const orderCommendState = atom({
    key: "orderCommend",
    default: "p.created",
});

export const orderbyState = atom({
    key: "orderby",
    default: "DESC"
});

export const darkState = atom({
    key: "isdark",
    default: false
})