import express from 'express';
import authRouter from './router/auth.routes';
import movieRouter from './router/movie.routes';
import genreRouter from './router/genre.routes';
import tvshowRouter from './router/tvshow.routes';
import listRouter from './router/list.routes';

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// middlewares
app.use("/auth", authRouter);
app.use("/movie", movieRouter);
app.use("/genre", genreRouter);
app.use("/tvshow", tvshowRouter);
app.use("/my-list", listRouter);

export default app;