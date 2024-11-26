"use client";
import { getAddress } from "@/services/address";
import { useQuery } from "@tanstack/react-query";

const useAddressQuery = () => {
  const queryKey = ["ADDRESS_KEY"];
  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: async () => {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) {
        return [];
      }
      return await getAddress();
    },
  });
  return { data, ...rest };
};

export default useAddressQuery;
