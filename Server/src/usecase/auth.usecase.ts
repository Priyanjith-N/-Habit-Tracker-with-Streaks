// constants
import { ErrorCode } from "../constants/customStatusErrorCode";
import { ErrorMessage } from "../constants/errorMesaage";

// custom error classes
import RequiredCredentialsNotGiven from "../errors/requiredCredentialsNotGiven.error";

// interfaces
import IAuthUseCase from "../interface/usecase/IAuth.usecase.interface";
import { IRegisterationCredentials } from "../entity/IUser.entity";

export default class AuthUseCase implements IAuthUseCase {
    async handelUserRegister(data: IRegisterationCredentials): Promise<string | never> {
        try {
            if(!data.userName || !data.email || !data.password || !data.confirmPassword) throw new RequiredCredentialsNotGiven(ErrorMessage.REQUIRED_CREDENTIALS_NOT_GIVEN, ErrorCode.CREDENTIALS_NOT_GIVEN_OR_NOT_FOUND);

            
            return "";
        } catch (err) {
            throw err;
        }
    }
}