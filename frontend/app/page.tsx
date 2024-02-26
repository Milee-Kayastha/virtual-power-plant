"use client";
import { getBatteries } from "@/api/api";
import BatteryForm from "@/components/BatteryForm";
import { Button, message } from "antd";
import { useEffect, useState } from "react";

interface Battery {
  name: string;
  postcode: string;
  wattCapacity: string;
}

export default function Home() {
  const [openBatteryForm, setOpenBatteryForm] = useState<boolean>(false);
  const [batteries, setBatteries] = useState<Battery[]>([]);
  const [batteryDataToBeEdited, setBatteryDataToBeEdited] =
    useState<Battery | null>(null);
  const [totalWattCapacity, setTotalWattCapacity] = useState("");
  const [averageWattCapacity, setAverageWattCapacity] = useState("");

  const getAllBatteries = async () => {
    try {
      const response = await getBatteries();
      setBatteries(response?.batteries);
      setTotalWattCapacity(response?.totalWattCapacity);
      setAverageWattCapacity(response?.averageWattCapacity);
    } catch (error) {
      // message.error(error);
    }
  };

  useEffect(() => {
    getAllBatteries();
  }, []);

  return (
    <main>
      <div>
        <Button type="primary" onClick={() => setOpenBatteryForm(true)}>
          Add Battery
        </Button>
        <div>
          <h2>Battery List</h2>
          <ul>
            {batteries.map((battery, index) => (
              <li key={index}>
                {battery.name} - {battery.postcode} - {battery.wattCapacity}{" "}
                watts
              </li>
            ))}
          </ul>
          <h3>Total Watt Capacity: {totalWattCapacity}</h3>
          <h3>Average Watt Capacity: {averageWattCapacity}</h3>
        </div>
        {openBatteryForm && (
          <BatteryForm
            batteryData={batteryDataToBeEdited}
            isOpen={openBatteryForm}
            onClose={() => setOpenBatteryForm(false)}
          />
        )}
      </div>
    </main>
  );
}
