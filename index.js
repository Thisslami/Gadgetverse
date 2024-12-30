const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const cors = require('cors');
require('dotenv').config();
const authRouter = require("./routes/auth/auth-routes");

const dbURL = process.env.MONGODB_URL; // Fetch the database URL from the environment variables

// Connect to MongoDB
mongoose
    .connect(dbURL) // Ensure options are passed
    .then(() => {
        console.log('Connected to MongoDB');
        
        const app = express(); // Initialize the Express app
        const PORT = process.env.PORT || 8050;
        
        // Middleware setup
        app.use(
            cors({
                origin: ['https://localhost:5173',
                    'http://localhost:5173',
                ],
                
                 // Update this to match your front-end URL
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                allowedHeaders: [
                    'Content-Type',
                    'Authorization',
                    'Cache-Control',
                    'Expires',
                    'Pragma',
                ],
                credentials: true,
            })
        );
        app.use(express.json());
        app.use(cookieParser());
        app.use("/api/auth", authRouter);
        
        // Start the server
        app.listen(PORT, () =>
            console.log(`😍😍 Server is now running on port ${PORT} 🎉🥳`)
        );
    })
    .catch((error) => console.error('Failed to connect to MongoDB', error));
