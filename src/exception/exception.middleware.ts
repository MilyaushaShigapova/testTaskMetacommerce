import {NextFunction, Request, Response} from "express";
import {HttpException} from "../utils/http-exception";


export const exceptionMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {

    if(err instanceof HttpException){
        return res.status(err.status).json({message: err.message})
    }

    return res.status(500).json({message: 'Неопределенная ошибка', errors: err})
}