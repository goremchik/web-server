import * as bcrypt from 'bcrypt';

export class HashService {
    static async hash(data: string): Promise<string> {
        return bcrypt.hash(data, 10);
    }

    static async validate(rawData: string, compareTo: string): Promise<boolean> {
        return await bcrypt.compare(rawData, compareTo);
    }
}
