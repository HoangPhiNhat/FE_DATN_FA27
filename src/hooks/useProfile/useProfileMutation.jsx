import { changePassword, updateProfile } from "@/services/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useProfileMutation = ({ action, onSuccess, onError }) => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: async (data) => {
      switch (action) {
        case "CHANGE_PASSWORD":
          return await changePassword(data);
        case "UPDATE_PROFILE":
          console.log(data);
          return await updateProfile(data);
        // case "UPDATE_ADDRESS":
        //   return await updateAddress(data);
        default:
          return null;
      }
    },
    onSuccess: (data) => {
      onSuccess && onSuccess(data);
      queryClient.invalidateQueries({
        queryKey: ["PROFILE_KEY"],
      });
    },
    onError: (error) => {
      onError && onError(error);
    },
  });

  return { mutate, ...rest };
};

export default useProfileMutation;
