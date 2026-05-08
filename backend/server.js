import './utils/env.js'; 
import app from "./app.js";

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

process.on("SIGTERM", () => {
    console.log("SIGTERM received. Shutting down...");
    server.close(() => {
        console.log("Process terminated");
    });
});

process.on("SIGINT", () => {
    console.log("SIGINT received. Shutting down...");
    process.exit(0);
});