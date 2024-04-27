import express from 'express';
import authRouter from './router/auth.routes';

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// middlewares
app.use("/auth", authRouter);

export default app;