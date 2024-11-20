import { addToCart, deleteCart, updateCart } from "@/services/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCartMutation = ({ action, onSuccess, onError }) => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: async (data) => {
      switch (action) {
        case "CREATE":
          return await addToCart(data);
        case "DELETE":
          return await deleteCart(data);
        case "UPDATE":
          return await updateCart(data);
        default:
          return null;
      }
    },
    onSuccess: (data) => {
      onSuccess && onSuccess(data);
      queryClient.invalidateQueries({
        queryKey: ["CART_KEY"],
      });
    },
    onError: (error) => {
      onError && onError(error);
    },
  });

  return { mutate, ...rest };
};

export default useCartMutation;
