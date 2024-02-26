import {
  CloseOutlined,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import React, { useState } from "react";

const SearchFilter = ({ getAllBatteries }: any) => {
  const [showFilter, setShowFilter] = useState(false);
  const [batteryName, setBatteryName] = useState("");
  const [startPostcode, setStartPostcode] = useState("");
  const [endPostcode, setEndPostcode] = useState("");
  const [showRemoveSearch, setShowRemoveSearch] = useState(false);

  const handleSearch = () => {
    setShowRemoveSearch(true);
    getAllBatteries("", "", batteryName);
    setStartPostcode("");
    setEndPostcode("");
  };

  const handleFilter = (e: any) => {
    e.preventDefault();
    setBatteryName("");
    getAllBatteries(startPostcode, endPostcode, "");
  };

  const handleReset = () => {
    setStartPostcode("");
    setEndPostcode("");
    setBatteryName("");
    getAllBatteries("", "", "");
    setShowRemoveSearch(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Tooltip title={showFilter ? "Hide Filter" : "Show filter"}>
          <Button
            shape="circle"
            onClick={() => setShowFilter(!showFilter)}
            icon={<FilterOutlined />}
          />
        </Tooltip>
        <input
          type="search"
          name="name"
          id="name"
          className="block rounded-md p-1.5 shadow-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-xs"
          placeholder="Search by Battery Name"
          value={batteryName}
          onChange={(e) => {
            setBatteryName(e.target.value);
          }}
          autoComplete="off"
        />
        <button
          type="button"
          className="flex gap-2 items-center rounded-md bg-blue-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600"
          onClick={handleSearch}
        >
          Search <SearchOutlined />
        </button>
        {showRemoveSearch && (
          <Tooltip title="Clear Search">
            <Button
              shape="circle"
              onClick={handleReset}
              icon={<CloseOutlined />}
            />
          </Tooltip>
        )}
      </div>

      {showFilter && (
        <>
          <form
            className="flex flex-wrap items-center gap-2"
            onSubmit={handleFilter}
          >
            <span className="text-sm">Postcode range:</span>
            <input
              type="text"
              name="startPostcode"
              id="startPostcode"
              className="block rounded-md p-1.5 shadow-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-xs"
              placeholder="Start Postcode"
              value={startPostcode}
              onChange={(e) => setStartPostcode(e.target.value)}
              autoComplete="off"
              required
            />
            <input
              type="text"
              name="endPostcode"
              id="endPostcode"
              className="block rounded-md p-1.5 shadow-sm border border-gray-300 placeholder:text-gray-400 placeholder:text-xs"
              placeholder="End Postcode"
              value={endPostcode}
              onChange={(e) => setEndPostcode(e.target.value)}
              autoComplete="off"
              required
            />
            <button
              type="submit"
              className="flex gap-2 items-center rounded-md bg-blue-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600"
            >
              Filter
            </button>
            <button
              type="button"
              className="flex gap-2 items-center rounded-md border text-blue-800 border-blue-800 px-3 py-2 text-sm font-semibold shadow-sm hover:border-blue-600"
              onClick={handleReset}
            >
              Reset
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default SearchFilter;
