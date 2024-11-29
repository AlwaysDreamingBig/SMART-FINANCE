import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from './config/app.config';
import { connectDatabase } from './database/connectors/mongodbDatabase';

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

// Example route for testing
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Hello, MERN with TypeScript!',
  });
});

// Error-handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(500).json({ error: err.message });
});


// Start the server
app.listen(PORT, async () => {
  try {
      await connectDatabase(); // Establish MongoDB connection
      console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
      console.error('Failed to start the server:', error);
  }
});
