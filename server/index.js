import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';

//components
import Connection from './database/db.js';
import Router from './routes/route.js';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
fs.mkdirSync("uploads", { recursive: true });
app.use('/', Router);


const PORT = 8000;
// const username = process.env.DB_USERNAME;
// const password = process.env.DB_PASSWORD;


Connection();

app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));