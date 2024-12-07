import { cancelOrder } from "@/services/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useOrderMutation = ({ action, onSuccess, onError }) => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: async (data) => {
      switch (action) {
        case "CANCEL_ORDER":
          return await cancelOrder(data);
        default:
          return null;
      }
    },
    onSuccess: (data) => {
      onSuccess && onSuccess(data);
      queryClient.invalidateQueries({
        queryKey: ["ORDER_KEY"],
      });
    },
    onError: (error) => {
      onError && onError(error);
    },
  });

  return { mutate, ...rest };
};

export default useOrderMutation;
