import { TErrorSorces, TGenericErrorRespose } from "../interface/error"

const handleDuplicateError = (err: any): TGenericErrorRespose => {
    const statusCode = 400
    const name = err.keyValue.name
    const errorSources: TErrorSorces = [{
        path: '',
        message: `${name} is already exist`
    }]
    return {
        statusCode,
        message: '',
        errorSources
    }
}

export default handleDuplicateError