// interfaces
import { ILoginCredentials, IRegisterationCredentials } from "../../entity/IUser.entity";

export default interface IAuthUseCase {
    handelUserRegister(data: IRegisterationCredentials): Promise<string | never>;
    handelUserLogin(loginCredentials: ILoginCredentials): Promise<string | never>;
}