import passport, { PassportStatic } from "passport";
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptionsWithRequest } from "passport-jwt";
import {
  refreshTokenSignOptions,
  adminRefreshTokenSignOptions,
  managerRefreshTokenSignOptions,
  developerRefreshTokenSignOptions,
  clientRefreshTokenSignOptions,
} from "../utils/jwt";
import { UserService } from "../../modules/user/user.service";
import { throwAppError } from "../../middleware/errorHandler";
import { AppErrorMessage } from "../enums/app-error.enum";
import { HTTPSTATUS } from "../../config/http.config";


// Define options for JWT strategy with dynamic token handling based on the cookie
const opts: StrategyOptionsWithRequest = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => {
      let refreshToken;
      if (req.cookies.refreshToken) {
        refreshToken = req.cookies.refreshToken;
      } else if (req.cookies.adminRefreshToken) {
        refreshToken = req.cookies.adminRefreshToken;
      } else if (req.cookies.managerRefreshToken) {
        refreshToken = req.cookies.managerRefreshToken;
      } else if (req.cookies.developerRefreshToken) {
        refreshToken = req.cookies.developerRefreshToken;
      } else if (req.cookies.clientRefreshToken) {
        refreshToken = req.cookies.clientRefreshToken;
      } 

      if (!refreshToken) {
        throwAppError(AppErrorMessage.ACCESS_UNAUTHORIZED, HTTPSTATUS.UNAUTHORIZED);
      }
      return refreshToken;
    },
  ]),
  secretOrKeyProvider: (req, rawJwtToken, done) => {
    let secretOrKey: string | undefined;

    if (req.cookies.refreshToken) {
      secretOrKey = refreshTokenSignOptions.secret;
    } else if (req.cookies.adminRefreshToken) {
      secretOrKey = adminRefreshTokenSignOptions.secret;
    } else if (req.cookies.managerRefreshToken) {
      secretOrKey = managerRefreshTokenSignOptions.secret;
    } else if (req.cookies.developerRefreshToken) {
      secretOrKey = developerRefreshTokenSignOptions.secret;
    } else if (req.cookies.clientRefreshToken) {
      secretOrKey = clientRefreshTokenSignOptions.secret;
    }

    if (!secretOrKey) {
      return done(new Error('Unauthorized: No valid token found'), '');
    }

    // Call the done callback with the secret
    done(null, secretOrKey);
  },
  algorithms: ["HS256"], // Define supported algorithms
  passReqToCallback: true, // Pass the request object to the callback
};



// Define JWT strategy with dynamic secret and audience


export const setupJwtStrategy = (passport: PassportStatic) => {
    passport.use(
        new JwtStrategy(opts, async (req, jwt_payload, done) => {
          try {
            
            // Optionally log request headers (for debugging or monitoring)
            console.log(jwt_payload);
      
            // Call the UserService to fetch the user by ID
            const user = await UserService.findUserById(jwt_payload.userId);
      
            if (!user) {
              return done(null, false); // If user not found, return false (unauthorized)
            }
      
            // If user is found, return the user object for further use
            return done(null, user);
          } catch (err) {
            return done(err, false); // If an error occurs, return the error
          }
        })
    );
  };

  export const authenticateJWT = passport.authenticate("jwt", { session: false });