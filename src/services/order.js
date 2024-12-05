import Author from "./baseApi/AuthorApi";
export const createOrder = async (data) => {
  try {
    const response = await Author.post("/orders", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createOnlinePayment = async (data) => {
  try {
    const response = await Author.post("/momo/payment", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const orderHistory = async () => {
  const response = await Author.get("/orders/user-id?status=completed");
  return response.data;
};

export const getOrder = async () => {
  const response = await Author.get(`/orders`);
  return response.data;
};

export const cancelOrder = async (id) => {
  const response = await Author.put(`orders/${id}/order-status`, {
    order_status: "Đã hủy",
  });
  return response.data;
};
