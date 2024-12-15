import UnAuthor from "./baseApi/UnAuthorApi";
import Author from "./baseApi/AuthorApi";

export const getVoucher = async () => {
  const res = await Author.get("vouchers/client");
  return res.data;
};

export const applyVoucher = async (data) => {
  const res = await Author.post("vouchers/apply", {
    voucher_code: data.voucher_code,
    order_total: data.total,
  });
  return res.data;
};
