import { SES } from 'aws-sdk';
import { IQuote } from 'src/quotes/interfaces';

export class EmailService {
    constructor(private sendEmailService: SES, private sender: string, private subject: string) {}

    getParams = (email: string, quote: IQuote): any => ({
        Source: this.sender,
        ReplyToAddresses: [this.sender],
        Destination: {
            ToAddresses: email.split(',')
        },
        Message: {
            Body: {
                Html: {
                    Data: this.getEmailTemplate(quote),
                    Charset: 'UTF-8'
                },
            },
            Subject: {
            Data: this.subject,
            Charset: 'UTF-8'
            }
        },
    });

    getEmailTemplate = ({ author, text }: IQuote): string => `
        <h5>${author}</h5>
        <p>${text}</p>
    `;

    async sendEmail(email: string, quote: IQuote): Promise<any> {
        return this.sendEmailService
            .sendEmail(this.getParams(email, quote))
            .promise()
    }
}
