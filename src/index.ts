import * as express from 'express';
import { Request, Response } from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import { AppDataSource } from './data-source';
import { Routes } from './routes';

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(morgan('dev'));
    app.use(cors());
    app.use(express.json());

    // register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    // start express server
    app.listen(3000);

    console.log('Express server has started on port 3000.');
  })
  .catch((error) => console.log(error));
