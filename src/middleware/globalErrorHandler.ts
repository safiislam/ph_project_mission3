/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Application, ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSorces } from '../interface/error';
import config from '../config';
import handleZodError from '../Errors/HandleZodError';
import handleValidationError from '../Errors/HandleValidationError';
import handleCastError from '../Errors/HandleCastError';
import handleDuplicateError from '../Errors/handleDuplicateError';
import AppError from '../Errors/AppError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

    //  setting  default values
    let statusCode = 500
    let message = "something went wrong"

    let errorSources: TErrorSorces = [{
        path: '',
        message: 'something went wrong'
    }]


    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err)
        statusCode = simplifiedError?.statusCode
        message = simplifiedError?.message
        errorSources = simplifiedError?.errorSources
    }
    else if (err?.name === 'ValidationError') {
        const simplifiedError = handleValidationError(err)
        statusCode = simplifiedError?.statusCode
        message = simplifiedError?.message
        errorSources = simplifiedError?.errorSources
    }
    else if (err?.name === "CastError") {
        const simplifiedError = handleCastError(err)
        statusCode = simplifiedError?.statusCode
        message = simplifiedError?.message
        errorSources = simplifiedError?.errorSources
    }
    else if (err?.code === 11000) {
        const simplifiedError = handleDuplicateError(err)
        statusCode = simplifiedError?.statusCode
        message = simplifiedError?.message
        errorSources = simplifiedError?.errorSources

    }
    else if (err instanceof AppError) {
        statusCode = err?.statusCode
        message = err?.message
        errorSources = [
            {
                path: '',
                message: err.message
            }
        ]
    }
    else if (err instanceof Error) {
        message = err?.message
        errorSources = [
            {
                path: '',
                message: err.message
            }
        ]
    }
    res.status(statusCode).json({
        success: false,
        message: message,
        errorSources,
        error: err,
        stack: config.NODE_ENV === 'development' ? err?.stack : null
    })
}
export default globalErrorHandler
