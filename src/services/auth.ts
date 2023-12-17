import { getCurrentDate } from "../utils/getCurrentDate";

export const validatePassword = (password: string) => {
    const currentPassword = getCurrentDate().replaceAll("/", "");
    return password === currentPassword;
};

export const getToken = () => {
    const currentPassword = getCurrentDate().replaceAll("/", "");
    const token = `${process.env.DEFAULT_TOKEN}${currentPassword}`;
    return token;
};

export const validateToken = (token: string) => {
    const currentToken = getToken();
    return token === currentToken;
};
