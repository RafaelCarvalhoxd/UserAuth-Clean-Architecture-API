import { createServer } from '@/infrastructure/config/server/server.config';
import { configureAuthRoutes } from '@/presentation/routes/auth.routes';

const PORT = process.env.PORT || 3000;

const app = createServer([configureAuthRoutes]);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
