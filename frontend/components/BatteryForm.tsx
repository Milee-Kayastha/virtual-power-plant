"use client";
import { createBattery, updateBattery } from "@/api/api";
import { Battery, BatteryFormProps } from "@/utils/interface";
import { Modal, message } from "antd";
import React, { useState } from "react";

const BatteryForm = ({
  batteryData,
  isOpen,
  onClose,
  getAllBatteries,
}: BatteryFormProps) => {
  const [battery, setBattery] = useState<Battery>({
    name: batteryData?.name ?? "",
    postcode: batteryData?.postcode ?? "",
    wattCapacity: batteryData?.wattCapacity ?? "",
  });
  const formType = batteryData ? "Edit" : "Add";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formType === "Add") {
      addBattery();
    } else {
      editBattery();
    }
  };

  const addBattery = async () => {
    try {
      const response = await createBattery(battery);
      message.success(response?.message);
      getAllBatteries();
      onClose();
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const editBattery = async () => {
    try {
      if (!batteryData?._id) return;
      const response = await updateBattery(batteryData?._id, battery);
      message.success(response?.message);
      getAllBatteries();
      onClose();
    } catch (error: any) {
      message.error(error.message);
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
      title={formType + " Battery"}
      open={isOpen}
      // onOk={handleOk}
      onCancel={onClose}
      footer={null}
    >
      <form className="grid gap-6 mt-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Battery Name
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="name"
              id="name"
              className="block w-full rounded-md p-1.5 shadow-sm border border-gray-300 placeholder:text-gray-400"
              placeholder="Name"
              value={battery.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="postcode" className="block text-sm font-medium">
            Postcode
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="postcode"
              id="postcode"
              className="block w-full rounded-md p-1.5 shadow-sm border border-gray-300 placeholder:text-gray-400"
              placeholder="Postcode"
              value={battery.postcode}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="wattCapacity" className="block text-sm font-medium">
            Watt Capacity
          </label>
          <div className="mt-2">
            <input
              type="number"
              name="wattCapacity"
              id="wattCapacity"
              className="block w-full rounded-md p-1.5 shadow-sm border border-gray-300 placeholder:text-gray-400"
              placeholder="Watt Capacity"
              value={battery.wattCapacity}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-6">
          <button
            type="button"
            className="text-sm font-semibold"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-blue-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600"
          >
            {formType} Battery
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default BatteryForm;
