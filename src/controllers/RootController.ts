import { Request, Response, NextFunction } from 'express';
import { get, controller, use } from './decorators/index';

function requiredLogin(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.loggedIn) {
    next();
    return;
  }

  res.status(403).send('Not permitted!');
}

@controller('')
class RootController {
  @get('/')
  getRoot(req: Request, res: Response) {
    if (req.session && req.session.loggedIn) {
      res.send(`
        <div>
          <div>You're logged in !</div>
          <a href="/auth/logout">Logout</a>
        </div>
    `);
    } else {
      res.send(`
        <div>
          <div>You're not logged in !</div>
          <a href="/auth/login">Login</a>
        </div>
    `);
    }
  }

  @get('/protected')
  @use(requiredLogin)
  getProtected(req: Request, res: Response) {
    res.send('Welcome to protected route, logged in user!');
  }
}
