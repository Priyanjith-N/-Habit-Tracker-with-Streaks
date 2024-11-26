// constants
import { ErrorCode } from "../constants/customStatusErrorCode";
import { ErrorMessage } from "../constants/errorMesaage";
import { StatusCodes } from "../constants/statusCode";
import { ErrorField } from "../constants/errorField";

// custom error classes
import RequiredCredentialsNotGiven from "../errors/requiredCredentialsNotGiven.error";
import ValidationError from "../errors/validationErrorDetails.error";

// interfaces
import IAuthUseCase from "../interface/usecase/IAuth.usecase.interface";
import IUser, { ILoginCredentials, IRegisterationCredentials } from "../entity/IUser.entity";
import IAuthRepository from "../interface/repositories/IAuth.repository.interface";
import IHashingService from "../interface/utils/IHashingService";
import IJWTService, { IPayload } from "../interface/utils/IJWTService";

export default class AuthUseCase implements IAuthUseCase {
    private authRepository: IAuthRepository;
    private hashingService: IHashingService;
    private JWTService: IJWTService;

    constructor(authRepository: IAuthRepository, hashingService: IHashingService, JWTService: IJWTService) {
        this.authRepository = authRepository;
        this.hashingService = hashingService;
        this.JWTService = JWTService;
    }

    async handelUserRegister(data: IRegisterationCredentials): Promise<string | never> {
        try {
            if(!data.userName || !data.email || !data.password || !data.confirmPassword) throw new RequiredCredentialsNotGiven(ErrorMessage.REQUIRED_CREDENTIALS_NOT_GIVEN, ErrorCode.CREDENTIALS_NOT_GIVEN_OR_NOT_FOUND);

            if(!(/^[A-Za-z0-9]+@gmail\.com$/).test(data.email)) {
                throw new ValidationError({ 
                    statusCode: StatusCodes.BadRequest,
                    errorField: ErrorField.EMAIL,
                    message: ErrorMessage.EMAIL_NOT_VAILD,
                    errorCode: ErrorCode.PROVIDE_VAILD_EMAIL
                });
            }else if(data.password.length < 8) {
                throw new ValidationError({ 
                    statusCode: StatusCodes.BadRequest,
                    errorField: ErrorField.PASSWORD,
                    message: ErrorMessage.PASSWORD_MIN_LENGTH_NOT_MEET,
                    errorCode: ErrorCode.PASSWORD_MIN_LENGTH_NOT_MEET
                });
            }else if (data.password !== data.confirmPassword) {
                throw new ValidationError({
                    statusCode: StatusCodes.BadRequest,
                    errorField: ErrorField.PASSWORD_AND_CONFIRM_PASSWORD,
                    message: ErrorMessage.BOTH_PASSWORD_MISS_MATCH,
                    errorCode: ErrorCode.PASSWORD_INVAILD
                });
            }

            const userData: IUser | null = await this.authRepository.isUserExist(data.email, data.userName);

            if (userData && userData.userName === data.userName) {
                throw new ValidationError({
                    statusCode: StatusCodes.BadRequest,
                    errorField: ErrorField.USERNAME,
                    message: ErrorMessage.USERNAME_ALREADY_TAKEN,
                    errorCode: ErrorCode.USERNAME_TAKEN
                });
            }else if(userData && userData.email === data.email) {
                throw new ValidationError({
                    statusCode: StatusCodes.BadRequest,
                    errorField: ErrorField.EMAIL,
                    message: ErrorMessage.EMAIL_ALREADY_TAKEN,
                    errorCode: ErrorCode.EMAIL_TAKEN
                });
            }

            const newUserData: Omit<IUser, "_id"> = {
                userName: data.userName,
                email: data.email.toLowerCase(),
                password: await this.hashingService.hash(data.password)
            }

            const newData: IUser = await this.authRepository.createNewUser(newUserData);

            const payload: IPayload = {
                id: newData._id
            }

            const token: string = this.JWTService.sign(payload, "1d");

            return token;
        } catch (err) {
            throw err;
        }
    }

    async handelUserLogin(loginCredentials: ILoginCredentials): Promise<string | never> {
        try {
            if(!loginCredentials.email || !loginCredentials.password) throw new RequiredCredentialsNotGiven(ErrorMessage.REQUIRED_CREDENTIALS_NOT_GIVEN, ErrorCode.CREDENTIALS_NOT_GIVEN_OR_NOT_FOUND);

            if(!(/^[A-Za-z0-9]+@gmail\.com$/).test(loginCredentials.email)) {
                throw new ValidationError({
                    statusCode: StatusCodes.BadRequest,
                    errorField: ErrorField.EMAIL,
                    message: ErrorMessage.EMAIL_NOT_VAILD,
                    errorCode: ErrorCode.PROVIDE_VAILD_EMAIL
                });
            }

            const userData: IUser | null = await this.authRepository.getUserDataByEmail(loginCredentials.email);

            if(!userData) {
                throw new ValidationError({
                    errorField: ErrorField.EMAIL,
                    message: ErrorMessage.USER_NOT_FOUND,
                    statusCode: StatusCodes.NotFound,
                    errorCode: ErrorCode.USER_NOT_FOUND
                });
            }else if(!await this.hashingService.compare(loginCredentials.password, userData.password)) {
                throw new ValidationError({
                    errorField: ErrorField.PASSWORD,
                    message: ErrorMessage.PASSWORD_INCORRECT,
                    statusCode: StatusCodes.BadRequest,
                    errorCode: ErrorCode.PASSWORD_INCORRECT
                });
            }

            const payload: IPayload = {
                id: userData._id
            }

            const token: string = this.JWTService.sign(payload, "1d");

            return token;
        } catch (err: any) {
            throw err;
        }
    }
}