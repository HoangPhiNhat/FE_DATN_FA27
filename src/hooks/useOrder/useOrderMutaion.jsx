import { cancelOrder, confirmOrder, deliverOrder } from "@/services/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useOrderMutation = ({ action, onSuccess, onError }) => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: async (data) => {
      switch (action) {
        case "CANCEL_ORDER":
          console.log(data);
          return await cancelOrder(data);
        case "RECEIVED_ORDER":
          return await confirmOrder(data.id, data.order_status);
        case "NOT_RECEIVE_ORDER":
          return await deliverOrder(data.id, data.order_status);
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
