import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();

import connectDB from './src/db/mongoose.js';
import { app } from './app.js';

// Define PORT from environment variables
const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to the database', error);
    process.exit(1); // Exit with error
  }
};

startServer();
