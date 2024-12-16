import React, { useState, useEffect } from "react";

const PriceFilter = ({ minPrice, setMinPrice, maxPrice, setMaxPrice }) => {
  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);

  useEffect(() => {
    setLocalMinPrice(minPrice);
    setLocalMaxPrice(maxPrice);
  }, [minPrice, maxPrice]);

  const handleMinPriceChange = (e) => {
    setLocalMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setLocalMaxPrice(e.target.value);
  };

  const handleApplyFilter = () => {
    setMinPrice(localMinPrice);
    setMaxPrice(localMaxPrice);
  };

  return (
    <div className="w-full mb-6">
      <h2 className="text-lg font-bold mb-4">Lọc theo giá</h2>
      <div className="flex flex-col gap-3">
        <input
          type="number"
          min="0"
          placeholder="Giá thấp nhất"
          value={localMinPrice === 0 ? "" : localMinPrice}
          onChange={handleMinPriceChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          min="0"
          placeholder="Giá cao nhất"
          value={localMaxPrice === 0 ? "" : localMaxPrice}
          onChange={handleMaxPriceChange}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleApplyFilter}
          className="bg-primary text-white py-2 px-4 rounded hover:bg-opacity-90"
        >
          Áp dụng
        </button>
        <button className="border py-2 px-4 rounded hover:bg-opacity-90">
          Loại bỏ bộ lọc
        </button>
      </div>
    </div>
  );
};

export default PriceFilter;
