import { ResponseText } from '../enums';

export class AlreadyExistsError extends Error {
    message = ResponseText.AlreadyExists;
}
