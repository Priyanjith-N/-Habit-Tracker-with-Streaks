import { NextFunction, Request, Response } from "express";

// custom error classes
import RequiredCredentialsNotGiven from "../../errors/requiredCredentialsNotGiven.error";
import ValidationError from "../../errors/validationErrorDetails.error";

// constants
import { StatusCodes } from "../../constants/statusCode";
import { ErrorMessage } from "../../constants/errorMesaage";



export default function errorHandlerMiddleware(err: any, req: Request, res: Response, next: NextFunction): void {
        if(err instanceof RequiredCredentialsNotGiven) {
                res.status(StatusCodes.BadRequest).json({ credentialsError: true, message: err.message, errorCode: err.errorCode });
        }else if(err instanceof ValidationError){
                res.status(err.details.statusCode).json({ errorCode: err.details.errorCode, errorField: err.details.errorField, message: err.message });
        }else {
                // Log entire error object
                console.error(err);
                res.status(StatusCodes.InternalServer).json({ internalServerError: true, message: ErrorMessage.INTERNAL_SERVER_ERROR });
        }
}