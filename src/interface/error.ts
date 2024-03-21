export type TErrorSorces = {
    path: number | string,
    message: string
}[]

export type TGenericErrorRespose = {
    statusCode: number
    message: string
    errorSources: TErrorSorces
}