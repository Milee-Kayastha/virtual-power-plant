import { backend_url } from "@/config";
import axios from "axios";

export let getBatteries = async (
  startPostcode: string,
  endPostcode: string,
  searchByName: string
) => {
  try {
    let filter = searchByName ? { name: searchByName } : {};
    const response = await axios.get(backend_url + `battery`, {
      params: {
        startPostcode: startPostcode ?? "",
        endPostcode: endPostcode ?? "",
        filter: filter,
      },
    });
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

export const updateBattery = async (
  batteryId: string,
  updatedBatteryData: any
) => {
  try {
    const response = await axios.put(
      backend_url + `battery/${batteryId}`,
      updatedBatteryData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBattery = async (batteryId: string) => {
  try {
    const response = await axios.delete(backend_url + `battery/${batteryId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
