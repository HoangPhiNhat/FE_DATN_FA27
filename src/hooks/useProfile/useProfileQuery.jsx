"use client";
import { profile } from "@/services/auth";
import { useQuery } from "@tanstack/react-query";

const useProfileQuery = () => {
  const queryKey = ["PROFILE_KEY"];
  const { data, ...rest } = useQuery({
    queryKey,
    queryFn: async () => {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) {
        return [];
      }
      return await profile();
    },
  });
  return { data, ...rest };
};

export default useProfileQuery;
