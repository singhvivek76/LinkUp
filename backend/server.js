import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import postRoutes from './routes/posts.routes.js';
import userRoutes from './routes/user.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();

app.use(cors());
app.use(express.json());

app.use(postRoutes);
app.use(userRoutes);

app.use(express.static("uploads"));


const start = async () => {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        throw new Error('MONGO_URI is missing. Add it to backend/.env or project-root .env');
    }

    await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 15000
    });

    console.log('Database connected');

    app.listen(9080, () => {
        console.log('Server is running on port 9080');
    });

}

// Only start server if running locally
if (process.env.NODE_ENV !== 'production') {
    start().catch((error) => {
        console.error('Failed to start server:', error.message);

        if (String(error.message).includes('querySrv ETIMEOUT')) {
            console.error('MongoDB SRV DNS lookup timed out. Try using a non-SRV URI (mongodb://...) or fix DNS/network.');
        }

        process.exit(1);
    });
}

export default app;
