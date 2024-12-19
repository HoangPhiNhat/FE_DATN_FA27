"use client";
import { getAllSize } from "@/services/size";
import { useQuery } from "@tanstack/react-query";

const useSizeQuery = (action) => {
  const queryKey = ["SIZE_KEY"];
  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: async () => {
      return await getAllSize();
    },
    staleTime: 0,
    gcTime: 0,
    refetchOnWindowFocus: true,
  });
  return { data, ...rest };
};

export default useSizeQuery;
