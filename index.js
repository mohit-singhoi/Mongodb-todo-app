import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import userRoutes from './routes/user.js';
import todoRoutes from './routes/todo.js';

const app = express();
dotenv.config();
const port = process.env.PORT

app.use(express.json());
app.use("/user", userRoutes);
app.use("/todo", todoRoutes);

try{

  await  mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

} catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
}

