import { atom } from "recoil";

export const offsetState = atom({
    key: "offset",
    default: 0,
});

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