import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "./config/app.config";
import { connectDatabase } from "./database/connectors/mongodbDatabase";
import {
  errorHandler,
  throwAppError,
  throwHttpError,
} from "./middleware/errorHandler";
import { HTTPSTATUS } from "./config/http.config";
import { AppErrorMessage } from "./common/enums/app-error.enum";
import registerRoute from "./modules/auth/auth.routes";
import { mailRodule } from "./mailers/mail.module";
import passport from "passport";
import { setupJwtStrategy } from "./common/strategies/jwt.stratety";
import { sessionRoute } from "./modules/session/session.routes";
import totpRouter from "./modules/mfa/totp/totp.routes";
import { userRoute } from "./modules/user/user.routes";
import { plaidRoute } from "./modules/plaid/plaid.routes";
import { dwollaRoute } from "./modules/dwolla/dwolla.route";
import session from "express-session";
import connectivityRouter from "./modules/truelayer/routes/connectivity.routes";

// Load environment variables from .env file
dotenv.config();

const app: Application = express();
const PORT = config.PORT || 5000;
const BASE_PATH = config.BASE_PATH;

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies
app.use(
  cors({
    origin: config.APP_ORIGIN,
    credentials: true,
  })
); // Enable CORS
app.use(cookieParser()); // Parse cookies

// Initialize passport
app.use(passport.initialize());

// Setup the JWT strategy (passport JWT)
setupJwtStrategy(passport);

// Session cookie setup
app.use(
  session({
    name: "session",
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // prevents JS access to cookie
      secure: process.env.NODE_ENV === "production", // only over HTTPS in prod
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// Example route for testing
app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Example of an async operation, e.g., fetching data from the database
    const data = { message: "Hello, MERN with TypeScript!" };
    res.status(HTTPSTATUS.OK).json(data);
  } catch (err) {
    // If any async error occurs, forward it to the error handler
    next(err);
  }
});

// Route to demonstrate throwing custom errors
app.get(
  "/error-demo",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Throwing a custom error
      throwHttpError("This is an http error", HTTPSTATUS.BAD_REQUEST);
    } catch (err) {
      next(err); // Forward the error to the error handler
    }
  }
);

// Route to demonstrate throwing app errors
app.get(
  "/app-error-demo",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Throwing a custom error
      throwAppError(AppErrorMessage.ACCESS_FORBIDDEN, HTTPSTATUS.FORBIDDEN);
    } catch (err) {
      next(err); // Forward the error to the error handler
    }
  }
);

// Routes
app.use(`${BASE_PATH}/auth`, registerRoute); // auth routes
app.use(`${BASE_PATH}/mailer`, mailRodule); // mailing routes
app.use(`${BASE_PATH}/session`, sessionRoute); // session routes
app.use(`${BASE_PATH}/totp`, totpRouter); // totp routes
app.use(`${BASE_PATH}/user`, userRoute); // user routes
app.use(`${BASE_PATH}/plaid`, plaidRoute); // plaid routes
app.use(`${BASE_PATH}/dwolla`, dwollaRoute); // dwolla routes
app.use(`${BASE_PATH}/truelayer`, connectivityRouter);

// Start the server
app.listen(PORT, async () => {
  try {
    await connectDatabase(); // Establish MongoDB connection
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
});

// Use the custom error handler middleware (must be after all route handlers)
app.use(errorHandler);
