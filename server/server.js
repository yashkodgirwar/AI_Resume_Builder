import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './configs/db.js';
import userRouter from './routes/userroutes.js';
import resumeRouter from './routes/resumeroutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// database connection

await connectDB();

app.use(express.json());
app.use(cors());

// Sample route
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

app.use("/api/users", userRouter);
app.use("/api/resumes",resumeRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});