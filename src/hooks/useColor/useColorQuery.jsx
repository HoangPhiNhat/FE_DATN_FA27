"use client";
import { getAllColor } from "@/services/color";
import { useQuery } from "@tanstack/react-query";

const useColorQuery = (action) => {
  const queryKey = ["COLOR_KEY"];
  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: async () => {
      return await getAllColor();
    },
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: true,
  });
  return { data, ...rest };
};

export default useColorQuery;
