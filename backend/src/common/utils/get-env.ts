import dotenv from 'dotenv';

// Ensure dotenv is initialized only once
if (!process.env.INITIALIZED) {
    dotenv.config();
    process.env.INITIALIZED = "true";
}

export const getEnv = (key: string, defaultValue: string = ""): string => {
    const value = process.env[key];

    if (!value || value.trim() === "") { // Catch undefined or empty string
        if (defaultValue) {
            return defaultValue;
        }
        throw new Error(`Environment variable "${key}" is not set or is empty. Please define it in your .env file.`);
    }

    return value;
};
