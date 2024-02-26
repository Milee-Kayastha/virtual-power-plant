import express from "express";
import { createBattery } from "../controllers/batteryController";

const router = express.Router();

router.post('/batteries', createBattery);

export default router;