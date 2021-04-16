import express from 'express';
import { dbConfig } from './config/db.config';
import { quoteRouter } from './routers/quote.router';
import { healthCheckRouter } from './routers/health-check.router';

const app = express();

app.use(express.static('static'));
app.use(express.json());
app.use('/api/quotes', quoteRouter);
app.use('/', healthCheckRouter);

const startApp = async (port) => {
    try {
        await dbConfig.connect();
        const server = app.listen(port, () => console.log(`App starts as port: ${port}`));
        const sigs = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
        sigs.forEach(signal => process.on(signal, () => {
            server.close(async () => {
                await dbConfig.close();
                process.exit(0);
            });
        }));
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

startApp(process.env.PORT || 3000);
