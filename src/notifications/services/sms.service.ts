import { SNS } from 'aws-sdk';
import { IQuote } from 'src/quotes/interfaces';

export class SmsService {
    constructor(private sendSmsService: SNS, private subject: string) {}

    getParams = (phone: string, quote: IQuote): any => ({
        Message: this.getText(quote),
        Subject: this.subject,
        PhoneNumber: phone,
    });

    getText = ({ author, text }: IQuote): string => `Author: ${author}\n${text}`;

    async sendSms(email: string, quote: IQuote): Promise<any> {
        return this.sendSmsService
            .publish(this.getParams(email, quote))
            .promise()
    }
}
