import express, { Express } from 'express';
import cors from 'cors';
import { exceptionMiddleware } from '../exception/exception.middleware';
import { routes } from '../routes';

const app: Express = express();

//cors middleware
app.use(
  cors({
    credentials: true,
  })
);

//json parse middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/', routes);

// exception middleware
app.use(exceptionMiddleware);

export { app };
