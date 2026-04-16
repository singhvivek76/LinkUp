import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import postRoutes from '../routes/posts.routes.js';
import userRoutes from '../routes/user.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
    const mongoUri = process.env.MONGO_URI;
    
    if (!mongoUri) {
        console.error('MONGO_URI is missing from environment variables');
        return;
    }
    
    try {
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(mongoUri, {
                serverSelectionTimeoutMS: 15000
            });
            console.log('MongoDB connected');
        }
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
    }
};

// Initialize DB connection
connectDB();

app.use(postRoutes);
app.use(userRoutes);
app.use(express.static("uploads"));

// Health check
app.get('/', (req, res) => {
    res.json({ message: 'Backend API is running' });
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ message: err.message || 'Internal server error' });
});

export default app;
