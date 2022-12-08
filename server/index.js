import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import { register } from "./controllers/auth.js";
import { uploadFile } from "./middleware/uploadFile.js";

/* CONFIGURATIONS */

// To grab the file url
const __filename = fileURLToPath(import.meta.url);

// Directory Name 
const __dirname = path.dirname(__filename);

// To use .env configurations
dotenv.config();

// To invoke express app
const app = express();

// To parse requests to json
app.use(express.json());

// To secure HTTP headers
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Http requests | errors logger 
app.use(morgan("common"));

// To parse requests to json max 30mb
app.use(bodyParser.json({ limit: "30mb", extended: true }));

// To parse requests to receive multipart/data
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// To use cors policy
app.use(cors());

// Setting Directory to keep assets
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/* ROUTES WITH FILES */
app.post("/auth/register", uploadFile, register);

/* MONGOOSE SETUP */
const port = process.env.PORT || 3001;
mongoose.connect(process.env.MONGO_URL , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(port, () => console.log(`Server PORT: http://localhost:${port}`));
}).catch((error) => console.log(`${error} did not connect`));