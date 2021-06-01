import { IQuote } from '../../quotes/interfaces/quote.interface';

export interface INotificationPayload {
    email?: string;
    phone?: string;
    quote: IQuote;
}
