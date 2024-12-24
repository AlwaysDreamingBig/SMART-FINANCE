import passport, { PassportStatic } from "passport";
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptionsWithRequest } from "passport-jwt";
import {
  accessTokenSignOptions,
  adminAccessTokenSignOptions,
  managerAccessTokenSignOptions,
  developerAccessTokenSignOptions,
  clientAccessTokenSignOptions,
} from "../utils/jwt";
import { UserService } from "../../modules/user/user.service";
import { throwAppError } from "../../middleware/errorHandler";
import { AppErrorMessage } from "../enums/app-error.enum";
import { HTTPSTATUS } from "../../config/http.config";


// Define options for JWT strategy with dynamic token handling based on the cookie
const opts: StrategyOptionsWithRequest = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    (req) => {
      let accessToken;
      if (req.cookies.accessToken) {
        accessToken = req.cookies.adminAccessToken;
      } else if (req.cookies.adminAccessToken) {
        accessToken = req.cookies.adminAccessToken;
      } else if (req.cookies.managerAccessToken) {
        accessToken = req.cookies.managerAccessToken;
      } else if (req.cookies.developperAccessToken) {
        accessToken = req.cookies.developperAccessToken;
      } else if (req.cookies.clientAccessToken) {
        accessToken = req.cookies.clientAccessToken;
      } 

      if (!accessToken) {
        throwAppError(AppErrorMessage.ACCESS_UNAUTHORIZED, HTTPSTATUS.UNAUTHORIZED);
      }
      return accessToken;
    },
  ]),
  secretOrKeyProvider: (req, rawJwtToken, done) => {
    let secretOrKey: string | undefined;

    if (req.cookies.accessToken) {
      secretOrKey = accessTokenSignOptions.secret;
    } else if (req.cookies.adminAccessToken) {
      secretOrKey = adminAccessTokenSignOptions.secret;
    } else if (req.cookies.managerAccessToken) {
      secretOrKey = managerAccessTokenSignOptions.secret;
    } else if (req.cookies.developerAccessToken) {
      secretOrKey = developerAccessTokenSignOptions.secret;
    } else if (req.cookies.clientAccessToken) {
      secretOrKey = clientAccessTokenSignOptions.secret;
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