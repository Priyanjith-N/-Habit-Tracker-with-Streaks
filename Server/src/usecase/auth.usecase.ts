// interfaces
import { IRegisterationCredentials } from "../entity/IUser.entity";
import IAuthUseCase from "../interface/usecase/IAuth.usecase.interface";

export default class AuthUseCase implements IAuthUseCase {
    async handelUserRegister(data: IRegisterationCredentials): Promise<string | never> {
        try {
            
            return "";
        } catch (err) {
            throw err;
        }
    }
}