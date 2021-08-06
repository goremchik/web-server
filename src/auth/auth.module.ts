import { registry, singleton, inject } from "tsyringe";
import { Router } from 'express';
import { ExtractJwt } from 'passport-jwt';
import { IEnv } from '../core/interfaces';
import { UserModel } from './models';
import { AuthRouter } from './routers';
import { AuthService, UserService } from './services';

@registry([
    { token: 'UserModel', useValue:  UserModel },
    { token: 'AuthService', useClass: AuthService },
    { token: 'UserService', useClass: UserService },
])
@singleton()
export class AuthModule {
    jwtOptions: any;
    static defaultSecret = 'web-server';

    constructor(
        @inject(AuthRouter) private authRouter: AuthRouter,
        @inject('env') env: IEnv,
    ) {
        this.jwtOptions = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: env.JWT_SECRET || AuthModule.defaultSecret,
        };
    }

    getRouter(): Router {
        return this.authRouter.defineRouter({ jwtOptions: this.jwtOptions });
    }
}
