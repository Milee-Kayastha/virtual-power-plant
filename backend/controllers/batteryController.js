import BatteryModel from "../models/batteryModel.js";

export const createBattery = async (req, res) => {
  try {
    const battery = await BatteryModel.create(req.body);
    res.json(blog);
    res.status(201).json({ message: "Battery created successfully", battery });
  } catch (error) {
    res.status(500).json({ message: "Failed to create battery", error });
  }
};
