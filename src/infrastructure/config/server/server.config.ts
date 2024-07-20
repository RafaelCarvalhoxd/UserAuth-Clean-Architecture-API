import express, { Express, Router } from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '@/infrastructure/config/swagger/swagger.config';

dotenv.config();

const createServer = (
  routeConfigurators: ((router: Router) => void)[],
): Express => {
  const app = express();
  app.use(express.json());

  const apiRouter = Router();
  routeConfigurators.forEach((configureRoutes) => configureRoutes(apiRouter));

  app.use('/api', apiRouter);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  return app;
};

export { createServer };
