import { Request, Response, NextFunction } from 'express';

// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     console.log(`[${req.method}] ${req.originalUrl}`);
//     next();
//   }
// }

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
}
