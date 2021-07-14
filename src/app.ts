import "reflect-metadata";
import express from 'express';
import { container } from "tsyringe";
import { StorageType } from './core/enums';
import { DBConfig } from './core/config/db.config';
import { QuotesModule } from './quotes/quotes.module';
import { healthCheckRouter } from './core/routers';

const a = 'a';
const startApp = async (port: number) => {
    container.register<any>('env', { useValue: process.env });
    const dbConfig = container.resolve(DBConfig);
    const quotesModule = container.resolve(QuotesModule);

    const app = express();
    app.use(express.json());
    app.use('/api/quotes', quotesModule.getRouter());
    app.use('/', healthCheckRouter);
    const useMongo = process.env.STORAGE_TYPE === StorageType.Mongo.toString();

    try {
        if (useMongo) {
            await dbConfig.connect();
        }
        const server = app.listen(port, () => console.log(`App starts on port: ${port}`));
        const sigs = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
        sigs.forEach(signal => process.on(signal, () => {
            server.close(async () => {
                console.log('Server stops.');
                if (useMongo) {
                    console.log('Waiting to close DB connection ...');
                    await dbConfig.close();
                }
                process.exit(0);
            });
        }));
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

startApp(parseInt(process.env.PORT || '3000'));
