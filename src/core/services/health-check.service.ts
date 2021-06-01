import { injectable } from 'tsyringe';
import { IHealthCheck } from '../interfaces';

@injectable()
export class HealthCheckService {
    ping(): IHealthCheck {
        return { statusCode: 200, message: 'OK', time:  +(new Date()) };
    }
}
