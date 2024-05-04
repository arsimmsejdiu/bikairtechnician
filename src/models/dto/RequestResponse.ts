export default interface RequestResponse<T> {
    statusCode: number,
    result: T,
}
