import { injectable, inject } from 'tsyringe';
import passport from 'passport';
import jwt, { Secret } from 'jsonwebtoken';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import { UserService } from '../services';
import { IUser } from '../interfaces';
import { LoggerService } from '../../core/services';
import { ResponseText } from '../../core/enums/response-text.enum';

@injectable()
export class AuthService {
    jwtOptions: StrategyOptions | null = null;
    constructor(
        @inject('UserService') private userService: UserService,
        private logger: LoggerService,
    ) {
        this.logger.setContext(AuthService.name);
    }

    initLocalStrategy(): void {
        passport.serializeUser(function (user: any, done) {
            done(null, user);
        });

        const localStrategy = new LocalStrategy(async (username, password, done) => {
            try {
                this.logger.log(`Attempt to login: ${username}`);
                const user = await this.userService.validateUser(username, password);
                if (user) return done(null, user);
            } catch(e) {
                this.logger.error(e);
            }

            return done(null, false, { message: ResponseText.WrongCredentials });
        });
    
        passport.use(localStrategy);
    }

    initJwtStrategy(options: StrategyOptions): void {
        this.jwtOptions = options;
        const jwtStrategy = new JwtStrategy(options, async (jwt_payload, done) => {
            try {
                this.logger.log(`Jwt validate user id: ${jwt_payload.id}`);
                const user = await this.userService.findOneById(jwt_payload.id);
                if (user) return done(null, user);
            } catch(e) {
                this.logger.error(e);
            }

            return done(null, false);
        });

        passport.use(jwtStrategy);
    }

    signJwt(user: IUser): any {
        const token = jwt.sign({ id: user?.id || '' }, this.jwtOptions?.secretOrKey as Secret);
        return { access_token: token, token_type: 'Bearer' };
    }
}
