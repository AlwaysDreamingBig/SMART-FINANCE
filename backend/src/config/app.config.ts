import { getEnv } from "../common/utils/get-env";

interface AppConfig {
    NODE_ENV: string;
    APP_ORIGIN: string;
    PORT: string;
    BASE_PATH: string;
    JWT: {
      SECRET: string;
      ADMIN_SECRET: string;
      MANAGER_SECRET: string;
      DEV_SECRET: string;

      EXPIRES_IN: string;
      ADMIN_EXPIRES_IN: string;
      MANAGER_EXPIRES_IN: string;
      DEV_EXPIRES_IN: string;

      REFRESH_SECRET: string;
      ADMIN_REFRESH_SECRET: string;
      MANAGER_REFRESH_SECRET: string;
      DEV_REFRESH_SECRET: string;

      REFRESH_EXPIRES_IN: string;
      ADMIN_REFRESH_EXPIRES_IN: string;
      MANAGER_REFRESH_EXPIRES_IN: string;
      DEV_REFRESH_EXPIRES_IN: string;
    };
    MONGO_URI: string;
    MONGO_DB_NAME: string;
  }

const appConfig = (): AppConfig => ({
    NODE_ENV: getEnv("NODE_ENV", "development"),
    APP_ORIGIN: getEnv("APP_ORIGIN", "localhost"),
    PORT: getEnv("PORT", "5000"),
    BASE_PATH: getEnv("BASE_PATH", "/api/v1"),
    JWT: {
        SECRET: getEnv("JWT_SECRET"),
        ADMIN_SECRET: getEnv("JWT_ADMIN_SECRET"),
        MANAGER_SECRET: getEnv("JWT_MANAGER_SECRET"),
        DEV_SECRET: getEnv("JWT_DEV_SECRET"),

        EXPIRES_IN: getEnv("JWT_EXPIRES_IN", "1h"),
        ADMIN_EXPIRES_IN: getEnv("JWT_ADMIN_EXPIRES_IN", "1h"),
        MANAGER_EXPIRES_IN: getEnv("JWT_MANAGER_EXPIRES_IN", "1h"),
        DEV_EXPIRES_IN: getEnv("JWT_DEV_EXPIRES_IN", "1h"),

        REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET"),
        ADMIN_REFRESH_SECRET: getEnv("JWT_ADMIN_REFRESH_SECRET"),
        MANAGER_REFRESH_SECRET: getEnv("JWT_MANAGER_REFRESH_SECRET"),
        DEV_REFRESH_SECRET: getEnv("JWT_DEV_REFRESH_SECRET"),

        REFRESH_EXPIRES_IN: getEnv("JWT_REFRESH_EXPIRES_IN", "30d"),
        ADMIN_REFRESH_EXPIRES_IN: getEnv("JWT_ADMIN_REFRESH_EXPIRES_IN", "30d"),
        MANAGER_REFRESH_EXPIRES_IN: getEnv("JWT_ MANAGER_REFRESH_EXPIRES_IN", "30d"),
        DEV_REFRESH_EXPIRES_IN: getEnv("JWT_DEV_REFRESH_EXPIRES_IN", "30d"),
    },
    MONGO_URI: getEnv("MONGO_URI"),
    MONGO_DB_NAME: getEnv("MONGO_DB_NAME", "smart_finance"),
});


export const config = appConfig();