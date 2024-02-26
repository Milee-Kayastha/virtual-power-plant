import { backend_url } from "@/config";
import axios from "axios";

export let getBatteries = async () => {
  try {
    const response = await axios.get(backend_url + `battery`, {
      params: {
        startPostcode: "",
        endPostcode: "",
        filter: {},
      },
    });
    console.log("res", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const createBattery = async (batteryData: any) => {
  try {
    const response = await axios.post(backend_url + "battery", batteryData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
