import { StatusCodes } from 'http-status-codes';
const SUCCESS_MSG = 'Success';
const ERROR_MSG = 'Error';

export class Response {
    statusCode = StatusCodes.OK;
    headers = { 'Access-Control-Allow-Origin': '*' };
    message =  SUCCESS_MSG;
    
    setError(code = StatusCodes.FORBIDDEN, msg = ERROR_MSG): void {
        this.statusCode = code;
        this.message = msg;
    }

    create = (): any => ({
        statusCode: this.statusCode,
        headers: this.headers,
        body: JSON.stringify({ message: this.message }),
    });
}