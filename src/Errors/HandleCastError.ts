import mongoose from "mongoose";
import { TErrorSorces } from "../interface/error";

const handleCastError = (err: mongoose.Error.CastError) => {
    const errorSources: TErrorSorces = [{
        path: err.path,
        message: err.message
    }]

    const statusCode = 400
    return {
        statusCode,
        message: 'Invalid Id',
        errorSources
    }

}

export default handleCastError