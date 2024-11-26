// interfaces
import IUser from "../../entity/IUser.entity";

export default interface IAuthRepository {
    isUserExist(email: string, userName: string): Promise<IUser | null | never>;
    createNewUser(newUserData: Omit<IUser, "_id">): Promise<IUser | never>;
    getUserDataByEmail(email: string): Promise<IUser | null | never>;
}