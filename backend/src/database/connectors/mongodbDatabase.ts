import mongoose from 'mongoose';
import { config } from '../../config/app.config';

// Get MongoDB URI from environment variables
const MONGO_URI = config.MONGO_URI;

export const connectDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGO_URI, {
            dbName: config.MONGO_DB_NAME, // Optional: specify DB name
        });
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit process with failure
    }
};

// Optional: Handle connection events for better debugging
mongoose.connection.on('connected', () => console.log('Mongoose connected to DB'));
mongoose.connection.on('error', (err) => console.error(`Mongoose connection error: ${err}`));
mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected from DB'));
