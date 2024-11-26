export default interface IUser {
    _id: string;
    userName: string;
    email: string;
    password: string;
}

export interface IUserLoginCredentials {
    email: string | undefined;
    password: string | undefined;
}

export interface IUserRegisterationCredentials {
    userName: string | undefined;
    email: string | undefined;
    password: string | undefined;
    confirmPassword: string | undefined;
}