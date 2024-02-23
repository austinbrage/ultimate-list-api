import type { Request, Response, NextFunction } from "express"
import type { StardardResponse } from "../types/custom"

export type AsyncFunction = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => Promise< Response<StardardResponse> | void > 

type ErrorHandler = (func: AsyncFunction) => (
    req: Request, 
    res: Response, 
    next: NextFunction
) => Promise< Response<StardardResponse> | void > 

export const asyncErrorHandler: ErrorHandler = (func) => {
    return async (req, res, next) => {
        try {
            await func(req, res, next)
        } catch (err) {
            console.error(err)
            next(err)
        }
    }
}