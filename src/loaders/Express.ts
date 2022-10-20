import express from 'express';
import Env from './Env';
import Routes from './Routes';
import Bootstrap from '../middlewares/Kernel';
import Passport from './Passport';

class Express {
  public express: express.Application;

  constructor() {
    this.express = express();

    this.mountEnv();
    this.mountMiddlewares();
    this.mountPassport();
    this.mountRoutes();
  }

  private mountEnv(): void {
    this.express = Env.init(this.express);
  }

  private mountMiddlewares(): void {
    this.express = Bootstrap.init(this.express);
  }

  private mountPassport(): void {
    this.express = Passport.init(this.express);
  }

  private mountRoutes(): void {
    if (Env.config().webEnabled) {
      this.express = Routes.mountWeb(this.express);
    }

    this.express = Routes.mountApi(this.express);

    console.log(
      'all routes',
      this.express._router.stack
        .filter((r: any) => r.route)
        .map((r: any) => {
          const methods = Object.keys(r.route.methods);
          return '[' + methods.join(',') + '] ' + r.route.path;
        })
    );
  }

  public init(): any {
    const port: number = Env.config().port;

    // Registering Exception / Error Handlers
    // this.express.use(ExceptionHandler.logErrors);
    // this.express.use(ExceptionHandler.clientErrorHandler);
    // this.express.use(ExceptionHandler.errorHandler);
    // this.express = ExceptionHandler.notFoundHandler(this.express);

    // Start the server on the specified port
    this.express.listen(port, () => {
      return console.log(
        '\x1b[33m%s\x1b[0m',
        `Server :: Running @ 'http://localhost:${port}'`
      );
    });
  }
}

export default new Express();
