import { INotificationPayload } from './interfaces';
import { SmsService, EmailService } from './services';
import { Response } from './helpers/Response';
import { getNotificationServices } from '../core/config/aws.config';

const { ses, sns } = getNotificationServices();
const emailService = new EmailService(ses, process.env.EMAIL_SENDER || '', 'Quote');
const smsService = new SmsService(sns, 'Quote');

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const sendNotification = async ({ body }: any, context: any, callback: any): Promise<any> => {
  const response = new Response();

  try {
    const { email = '', phone, quote }: INotificationPayload  = JSON.parse(body);
    if (email) {
      await emailService.sendEmail(email, quote);
    }

    if (phone) {
      await smsService.sendSms(phone, quote);
    }
  } catch (e) {
    console.log(e);
    response.setError();
  }

  callback(null, response.create());
};
