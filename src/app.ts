import express, {
  Application,
  Request,
  response,
  Response,
  NextFunction,
} from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running!');
});

app.use(globalErrorHandler);

// Not found (404) route
app.use(notFound);

export default app;
