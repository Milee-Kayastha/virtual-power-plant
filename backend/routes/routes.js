import express from "express";
import {
  createBattery,
  deleteBattery,
  editBattery,
  getBatteries,
} from "../controllers/batteryController.js";

const router = express.Router();

router.post("/", createBattery);
router.get("/", getBatteries);
router.put("/:id", editBattery);
router.delete("/:id", deleteBattery);

export default router;
