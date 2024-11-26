// importing collections
import Users from "../../framework/models/user.model";

// interfaces
import IUser from "../../entity/IUser.entity";
import IAuthRepository from "../../interface/repositories/IAuth.repository.interface";

export default class AuthRepository implements IAuthRepository {
    async isUserExist(email: string, userName: string): Promise<IUser | null | never> {
        try {
            return await Users.findOne({ $or: [{ email: { $regex: new RegExp(`^${email}$`, 'i') } }, { userName: { $regex: new RegExp(`^${userName}$`, 'i') } }] });
        } catch (err: any) {
            throw err;
        }
    }

    async createNewUser(newUserData: Omit<IUser, "_id">): Promise<IUser | never> {
        try {
            const newUser = new Users(newUserData);

            await newUser.save();

            return newUser;
        } catch (err: any) {
            throw err;
        }
    }

    async getUserDataByEmail(email: string): Promise<IUser | null | never> {
        try {
            return await Users.findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } });
        } catch (err: any) {
            throw err;
        }
    }
}