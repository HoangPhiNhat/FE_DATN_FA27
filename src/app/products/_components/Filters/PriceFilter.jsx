import React, { useState } from "react";

const PriceFilter = ({ minPrice, setMinPrice, maxPrice, setMaxPrice }) => {
  const handleMinPriceChange = (e) => {
    const value = e.target.value;
    setMinPrice(value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  return (
    <div className="w-full mb-6">
      <h2 className="text-lg font-bold mb-4">Lọc theo giá</h2>
      <div className="flex flex-col gap-3">
        <input
          type="number"
          min="0"
          placeholder="Giá thấp nhất"
          value={minPrice}
          onChange={handleMinPriceChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          min="0"
          placeholder="Giá cao nhất"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
};

export default PriceFilter;
