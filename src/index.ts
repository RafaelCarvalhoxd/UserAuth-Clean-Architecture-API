import express from 'express';
import dotenv from 'dotenv';
import { configureRoutes } from './presentation/routes/auth.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '@/infrastructure/config/swagger/swagger';

dotenv.config();
const app = express();
app.use(express.json());
const apiRouter = configureRoutes();

app.use('/api', apiRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
