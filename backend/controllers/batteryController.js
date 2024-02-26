import BatteryModel from "../models/batteryModel.js";

export const createBattery = async (req, res) => {
  try {
    const battery = await BatteryModel.create(req.body);
    res.status(201).json({ message: "Battery created successfully", battery });
  } catch (error) {
    res.status(500).json({ message: "Failed to create battery", error });
  }
};

export const getBatteries = async (req, res) => {
  try {
    let query = {};

    if (req.query.startPostcode && req.query.endPostcode) {
      query.postcode = {
        $gte: req.query.startPostcode,
        $lte: req.query.endPostcode,
      };
    }

    if (req.query.filter) {
      query = { ...query, ...req.query.filter };
    }

    const batteries = await BatteryModel.find(query).sort({ name: 1 });

    const totalWattCapacity = batteries.reduce(
      (acc, battery) => acc + battery.wattCapacity,
      0
    );
    const averageWattCapacity = totalWattCapacity / batteries.length;

    const response = {
      batteries,
      totalWattCapacity,
      averageWattCapacity,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch batteries", error });
  }
};
