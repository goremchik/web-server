import { Router, Request, Response } from 'express';
import { container } from "tsyringe";
import { HealthCheckService } from '../services';

const healthCheckRouter = Router();
const healthCheckService = container.resolve(HealthCheckService);

healthCheckRouter.get('/ping', (req: Request, res: Response) => {
    res.json(healthCheckService.ping());
});

export { healthCheckRouter };
