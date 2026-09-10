import express from "express";
import { detectWaste } from "../controllers/aiController.js";

const router = express.Router();

router.post("/detect", detectWaste);

export default router;