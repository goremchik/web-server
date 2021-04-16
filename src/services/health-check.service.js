export class HealthCheckService {
    ping() {
        return { statusCode: 200, message: 'OK', time:  +(new Date()) };
    }
}
