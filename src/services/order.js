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

export const createOnlinePaymentVNPay = async (data) => {
  try {
    const response = await Author.post("/vnpay_payment", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateStatusPayment = async (orderId, statusPayment) => {
  try {
    const res = await Author.put(`orders/${orderId}/payment-status`, {
      payment_status: statusPayment,
    });
    return res;
  } catch (error) {
    throw error;
  }
};
