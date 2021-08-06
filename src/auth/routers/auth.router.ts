import { Router, Request, Response } from 'express';
import { inject, singleton } from 'tsyringe';
import passport from 'passport';
import { StatusCodes } from 'http-status-codes';
import { AuthService, UserService } from '../services';
import { IUser } from '../interfaces';
import { LoggerService } from '../../core/services';
import { ResponseText } from '../../core/enums';
import { AlreadyExistsError } from '../../core/errors';

@singleton()
export class AuthRouter {
  quoteRouter = Router();
  constructor(
    @inject('AuthService') private authService: AuthService,
    @inject('UserService') private userService: UserService,
    private logger: LoggerService,
  ) {
    this.logger.setContext(AuthRouter.name);
  }

  defineRouter({ jwtOptions }: { [key: string]: any }): Router {
    this.authService.initLocalStrategy();
    this.authService.initJwtStrategy(jwtOptions);

    this.quoteRouter.post('/login',  passport.authenticate('local'), (req, res) => {
      this.logger.log('login - signJwt', req.user);
      return res.json({
        data: this.authService.signJwt(req.user as IUser),
      });
    });
  
    this.quoteRouter.post('/register', async ({ body }: Request, res: Response) => {
      try {
        const user = await this.userService.create(body);
        this.logger.log('register - user', user);
        res.json(user);
      } catch(e) {
        this.logger.error(e);
        if (e instanceof AlreadyExistsError) {
          res.status(StatusCodes.EXPECTATION_FAILED).json({ message: e.message });
        }
        
        res.status(StatusCodes.FORBIDDEN).json({ message: ResponseText.RegistrationError });
      }
  });

    return this.quoteRouter;
  }
}
