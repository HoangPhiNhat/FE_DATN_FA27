import { addAddress, updateAddress } from "@/services/address";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useAddressMutation = ({ action, onSuccess, onError }) => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: async (data) => {
      switch (action) {
        case "CREATE":
          return await addAddress(data);
        // case "DELETE":
        //   return await deleteAddress(data);
        case "UPDATE":
          console.log(data);
          return await updateAddress(data);
        default:
          return null;
      }
    },
    onSuccess: (data) => {
      onSuccess && onSuccess(data);
      queryClient.invalidateQueries({
        queryKey: ["ADDRESS_KEY"],
      });
    },
    onError: (error) => {
      onError && onError(error);
    },
  });

  return { mutate, ...rest };
};

export default useAddressMutation;
