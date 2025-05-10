import express from 'express';
import dotenv from 'dotenv'
import itemRoutes from './routes/item.routes.js'
import { connectDb } from './db/database.js';
dotenv.config();
const app = express();


const port = process.env.PORT || 4000
const api = process.env.API
app.use(express.json());

app.use(api, itemRoutes)
app.listen(port, async () => {
    await connectDb()
    console.log(`Server is started at http://localhost:${port}"`)
})