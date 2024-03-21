import { ZodError, ZodIssue } from "zod"
import { TErrorSorces, TGenericErrorRespose } from "../interface/error"

const handleZodError = (err: ZodError): TGenericErrorRespose => {
    const statusCode = 400
    const errorSources: TErrorSorces = err.issues.map((issue: ZodIssue) => {
        return {
            path: issue?.path[issue.path.length - 1],
            message: issue?.message
        }
    })
    return {
        statusCode,
        message: "Zod Validation Error",
        errorSources
    }
}
export default handleZodError