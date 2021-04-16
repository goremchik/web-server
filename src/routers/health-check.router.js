import { Router } from 'express';
import { HealthCheckService } from '../services/health-check.service';

const healthCheckRouter = new Router();
const healthCheckService = new HealthCheckService();

healthCheckRouter.get('/ping', (req, res) => {
    res.json(healthCheckService.ping());
});

export { healthCheckRouter };
