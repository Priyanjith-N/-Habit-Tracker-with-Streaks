// interfaces
import { IRegisterationCredentials } from "../../entity/IUser.entity";

export default interface IAuthUseCase {
    handelUserRegister(data: IRegisterationCredentials): Promise<string | never>;
}