import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/indexRoutes.js";

const app = express();

app.use(cors());
app.use(json());
dotenv.config();

app.use(router);

const port = process.env.PORT || 5005;
app.listen(port, () => console.log(`Ouvindo a porta ${port}`));