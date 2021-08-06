import { injectable } from 'tsyringe';

@injectable()
export class LoggerService {
    context = 'Global';

    setContext(context: string): void {
        this.context = context;
    }

    log(...args: any[]): void {
        console.log(`[${this.context}]`, ...args);
    }

    error(...args: any[]): void {
        console.error(`[${this.context}]`, ...args);
    }
}
