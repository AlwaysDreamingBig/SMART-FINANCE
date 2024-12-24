import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config/app.config';
import { connectDatabase } from './database/connectors/mongodbDatabase';
import { errorHandler, throwAppError, throwHttpError } from './middleware/errorHandler';
import { HTTPSTATUS } from './config/http.config';
import { AppErrorMessage } from './common/enums/app-error.enum';
import registerRoute from './modules/auth/auth.routes';
import { mailRodule } from './mailers/mail.module';
import passport from 'passport';
import { setupJwtStrategy } from './common/strategies/jwt.stratety';

// Load environment variables from .env file
dotenv.config();

const app: Application = express();
const PORT = config.PORT || 5000;
const BASE_PATH = config.BASE_PATH;

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies
app.use(cors({
    origin: config.APP_ORIGIN,
    credentials: true,
})); // Enable CORS
app.use(cookieParser()); // Parse cookies

// Initialize passport
app.use(passport.initialize());

// Setup the JWT strategy (passport JWT)
setupJwtStrategy(passport);

// Example route for testing
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Example of an async operation, e.g., fetching data from the database
    const data = { message: 'Hello, MERN with TypeScript!' };
    res.status(HTTPSTATUS.OK).json(data);
  } catch (err) {
    // If any async error occurs, forward it to the error handler
    next(err);
  }
});

// Route to demonstrate throwing custom errors
app.get('/error-demo', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Throwing a custom error
    throwHttpError('This is an http error', HTTPSTATUS.BAD_REQUEST);
  } catch (err) {
    next(err); // Forward the error to the error handler
  }
});

// Route to demonstrate throwing app errors
app.get('/app-error-demo', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Throwing a custom error
    throwAppError(AppErrorMessage.ACCESS_FORBIDDEN, HTTPSTATUS.FORBIDDEN);
  } catch (err) {
    next(err); // Forward the error to the error handler
  }
});

// Routes
app.use(`${BASE_PATH}/auth`, registerRoute); // auth routes
app.use(`${BASE_PATH}/mailer`, mailRodule); // mailing routes


// Start the server
app.listen(PORT, async () => {
  try {
      await connectDatabase(); // Establish MongoDB connection
      console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
      console.error('Failed to start the server:', error);
  }
});

// Use the custom error handler middleware (must be after all route handlers)
app.use(errorHandler);
