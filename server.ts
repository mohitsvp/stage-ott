import app from './src/app';
import dotenv from "dotenv"
import connect from './src/config/db';

dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    connect();
    console.log(`Server is running at http://localhost:${port}`);
});