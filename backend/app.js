import express from 'express';
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import hpp from 'hpp';
import { rateLimit } from 'express-rate-limit';

import { globalErrorHandler } from './middlewares/errorHandler.middleware.js';
import { AppError } from './utils/AppError.js';
import auditRoutes from './routes/auditRoutes.route.js'

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
});

app.set("trust proxy", 1);
app.use(helmet());
app.use(hpp());
app.use(limiter);

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
}));

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", message: "Day 1 Server is up." });
});

//Routes
app.use('/api/v1/audit', limiter, auditRoutes);


app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});


app.use(globalErrorHandler);

export default app;