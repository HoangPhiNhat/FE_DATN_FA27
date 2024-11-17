<div className="flex flex-col gap-.5">
  <p className="font-titleFont text-base font-semibold text-gray-600">City</p>
  <input
    onChange={handleCity}
    value={city}
    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
    type="text"
    placeholder="Your city"
  />
  {errCity && (
    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
      <span className="font-bold italic mr-1">!</span>
      {errCity}
    </p>
  )}
</div>;
{
  /* Country */
}
<div className="flex flex-col gap-.5">
  <p className="font-titleFont text-base font-semibold text-gray-600">
    Country
  </p>
  <input
    onChange={handleCountry}
    value={country}
    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
    type="text"
    placeholder="Your country"
  />
  {errCountry && (
    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
      <span className="font-bold italic mr-1">!</span>
      {errCountry}
    </p>
  )}
</div>;
{
  /* Zip code */
}
<div className="flex flex-col gap-.5">
  <p className="font-titleFont text-base font-semibold text-gray-600">
    Zip/Postal code
  </p>
  <input
    onChange={handleZip}
    value={zip}
    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
    type="text"
    placeholder="Your country"
  />
  {errZip && (
    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
      <span className="font-bold italic mr-1">!</span>
      {errZip}
    </p>
  )}
</div>;
