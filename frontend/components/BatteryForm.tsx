"use client";
import { createBattery } from "@/api/api";
import { Modal } from "antd";
import React, { useState } from "react";

interface BatteryData {
  name: string;
  postcode: string;
  wattCapacity: string;
}

interface BatteryFormProps {
  batteryData: BatteryData | null;
  isOpen: boolean;
  onClose: () => void;
}

const BatteryForm = ({ batteryData, isOpen, onClose }: BatteryFormProps) => {
  const [battery, setBattery] = useState<BatteryData>({
    name: batteryData?.name ?? "",
    postcode: batteryData?.postcode ?? "",
    wattCapacity: batteryData?.wattCapacity ?? "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // onSubmit(battery);
    addBattery();
  };

  const addBattery = async () => {
    try {
      const addedBattery = await createBattery(battery);
      console.log("Battery added successfully:", addedBattery);
      // Handle any further logic, such as updating state or displaying a success message
    } catch (error) {
      console.error("Failed to add battery:", error);
      // Handle error, such as displaying an error message to the user
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedValue = name === "wattCapacity" ? parseFloat(value) : value;
    setBattery({
      ...battery,
      [name]: updatedValue,
    });
  };

  return (
    <Modal
      title="Add Battery"
      open={isOpen}
      // onOk={handleOk}
      onCancel={onClose}
      footer={null}
    >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={battery.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Postcode"
          value={battery.postcode}
          name="postcode"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          placeholder="Watt Capacity"
          value={battery.wattCapacity}
          name="wattCapacity"
          onChange={handleChange}
          required
        />
        <button type="submit">Add Battery</button>
      </form>
    </Modal>
  );
};

export default BatteryForm;
