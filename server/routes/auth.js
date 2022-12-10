import express from "express";
import { login, register } from "../controllers/auth.js";
import { uploadFile } from "../middleware/uploadFile.js"

const router = express.Router();


// ROUTES 

router.post("/register", uploadFile, register);

router.post("/login", login);

export default router;