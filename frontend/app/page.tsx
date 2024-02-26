"use client";
import { deleteBattery, getBatteries } from "@/api/api";
import BatteryForm from "@/components/BatteryForm";
import StatCard from "@/components/StatCard";
import { Battery } from "@/utils/interface";
import { Popconfirm, Table, message } from "antd";
import { useEffect, useState } from "react";

export default function Home() {
  const [openBatteryForm, setOpenBatteryForm] = useState<boolean>(false);
  const [batteries, setBatteries] = useState<Battery[]>([]);
  const [batteryDataToBeEdited, setBatteryDataToBeEdited] =
    useState<Battery | null>(null);
  const [totalWattCapacity, setTotalWattCapacity] = useState("");
  const [averageWattCapacity, setAverageWattCapacity] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const columns = [
    {
      title: "Battery Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Postcode",
      dataIndex: "postcode",
      key: "postcode",
    },
    {
      title: "Watt Capacity",
      dataIndex: "wattCapacity",
      key: "wattCapacity",
    },
    {
      title: "Actions",
      key: "actions",
      render: (data: any) => (
        <div className="flex gap-4 text-blue-700 ">
          <button
            className="hover:underline"
            type="button"
            onClick={() => {
              setBatteryDataToBeEdited(data);
              setOpenBatteryForm(true);
            }}
          >
            Edit
          </button>
          <Popconfirm
            title="Delete the battery"
            description="Are you sure to delete this battery?"
            onConfirm={() => onDeleteBattery(data?._id)}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{
              style: { backgroundColor: "#1e40af", color: "white" },
            }}
          >
            <button className="hover:underline" type="button">
              Delete
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const onDeleteBattery = async (id: string) => {
    try {
      const response = await deleteBattery(id);
      message.success(response.message);
      getAllBatteries();
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const getAllBatteries = async () => {
    setIsLoading(true);
    try {
      const response = await getBatteries();
      setBatteries(response?.batteries);
      setTotalWattCapacity(response?.totalWattCapacity);
      setAverageWattCapacity(response?.averageWattCapacity);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      message.error(error.message);
    }
  };

  const onCloseBatteryForm = () => {
    setOpenBatteryForm(false);
    setBatteryDataToBeEdited(null);
  };

  useEffect(() => {
    getAllBatteries();
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-4">
      <div className="mt-8">
        <div>
          <h3 className="text-base font-semibold leading-6 text-gray-900">
            Statistics
          </h3>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {isLoading ? (
              <>
                <div className="animate-pulse w-full h-[108px] bg-gray-100 rounded"></div>
                <div className="animate-pulse w-full h-[108px] bg-gray-100 rounded"></div>
              </>
            ) : (
              <>
                {totalWattCapacity && (
                  <StatCard
                    title={"Total Watt Capacity"}
                    data={totalWattCapacity + " W"}
                  />
                )}
                {averageWattCapacity && (
                  <StatCard
                    title={"Average Watt Capacity"}
                    data={parseFloat(averageWattCapacity).toFixed(2) + " W"}
                  />
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex justify-end my-8">
          <button
            type="button"
            className="rounded-md bg-blue-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600"
            onClick={() => setOpenBatteryForm(true)}
          >
            Add Battery
          </button>
        </div>
        <Table
          dataSource={batteries}
          columns={columns}
          loading={isLoading}
          pagination={{
            defaultPageSize: 10,
          }}
        />
        {openBatteryForm && (
          <BatteryForm
            batteryData={batteryDataToBeEdited}
            isOpen={openBatteryForm}
            onClose={onCloseBatteryForm}
            getAllBatteries={getAllBatteries}
          />
        )}
      </div>
    </main>
  );
}
