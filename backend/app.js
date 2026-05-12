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
    windowMs: 60 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: { success: false, error: { message: "Too many audits. Try again later." }}
});

app.set("trust proxy", 1);
app.use(helmet());
app.use(hpp());

app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = process.env.ALLOWED_ORIGIN?.split(',') || ['http://localhost:3000'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new AppError('Not allowed by CORS', 403));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
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