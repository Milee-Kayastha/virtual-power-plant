import mongoose from "mongoose";

const batterySchema = new mongoose.Schema({
  name: { type: String, required: true },
  postcode: { type: String, required: true },
  wattCapacity: { type: Number, required: true },
});


const BatteryModel = mongoose.model("Battery", batterySchema);

export default BatteryModel;