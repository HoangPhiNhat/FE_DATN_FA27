"use client";
import { getAddress, getDistrict2 } from "@/services/address";
import { useQuery } from "@tanstack/react-query";

const useAddressQuery = (id) => {
  const queryKey = ["ADDRESS_KEY", id];
  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: async () => {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) {
        return [];
      }
      switch (id) {
        case "district":
          return await getDistrict2(id);
        default:
          return await getAddress();
      }
    },
    staleTime: 0,
    gcTime: 0,
  });
  return { data, ...rest };
};

export default useAddressQuery;
