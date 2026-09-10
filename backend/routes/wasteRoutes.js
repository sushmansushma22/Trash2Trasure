import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";


import {
  submitWaste,
  getAllWaste,
  updateWasteStatus,
} from "../controllers/wasteController.js";

const router = express.Router();

// User submits waste (login required)
router.post(
  "/",
  authMiddleware,
  submitWaste
);

// User sees only own waste
router.get("/", authMiddleware, getAllWaste);

// Recycler updates status
router.put("/:id", updateWasteStatus);

export default router;