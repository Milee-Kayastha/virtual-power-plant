import express from "express";
import { createBattery, getBatteries } from "../controllers/batteryController.js";

const router = express.Router();

router.post("/", createBattery);
router.get("/", getBatteries);

export default router;
