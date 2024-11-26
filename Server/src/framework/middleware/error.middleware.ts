import { NextFunction, Request, Response } from "express";

// constants
import { StatusCodes } from "../../constants/statusCode";
import { ErrorMessage } from "../../constants/errorMesaage";



export default function errorHandlerMiddleware(err: any, req: Request, res: Response, next: NextFunction): void {
        // Log entire error object
        console.error(err);
        res.status(StatusCodes.InternalServer).json({ internalServerError: true, message: ErrorMessage.INTERNAL_SERVER_ERROR });
}