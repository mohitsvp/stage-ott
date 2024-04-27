import app from './src/app';
import dotenv from "dotenv"
import connect from './src/config/db';

dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("URL ", process.env.MONGODB_URI)
    connect();
    console.log(`Server is running at http://localhost:${port}`);
});