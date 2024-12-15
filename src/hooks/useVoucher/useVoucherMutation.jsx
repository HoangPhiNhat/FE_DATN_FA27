import { applyVoucher } from "@/services/voucher";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useVoucherMutation = ({ onSuccess, onError }) => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: async (data) => {
        return await applyVoucher(data)
    },
    onSuccess: (data) => {
      onSuccess && onSuccess(data);
      queryClient.invalidateQueries({
        queryKey: ["VOUCHER_KEY"],
      });
    },
    onError: (error) => {
      onError && onError(error);
    },
  });

  return { mutate, ...rest };
};

export default useVoucherMutation;
