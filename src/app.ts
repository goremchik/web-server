import "reflect-metadata";
import express from 'express';
import { container } from "tsyringe";
import { DBConfig } from './config/db.config';
import { quoteRouter } from './routers/quote.router';
import { healthCheckRouter } from './routers/health-check.router';

const app = express();

app.use(express.static('static'));
app.use(express.json());
app.use('/api/quotes', quoteRouter);
app.use('/', healthCheckRouter);

const startApp = async (port: number) => {
    container.register("env", { useValue: process.env as any });
    const dbConfig = container.resolve(DBConfig);

    try {
        await dbConfig.connect();
        const server = app.listen(port, () => console.log(`App starts as port: ${port}`));
        const sigs = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
        sigs.forEach(signal => process.on(signal, () => {
            server.close(async () => {
                console.log('Server stops. Waiting to close DB connection ...');
                await dbConfig.close();
                process.exit(0);
            });
        }));
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

startApp(parseInt(process.env.PORT || '3000'));
