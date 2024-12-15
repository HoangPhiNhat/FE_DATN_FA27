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

export const getHistoryOrder = async (page = 1, size = 4) => {
  const response = await Author.get(
    `/orders/user-id?status=history&page=${Number(page)}&size=${Number(
      size
    )}&sort=DESC`
  );
  return response.data;
};

export const getDeliveryOrder = async (page = 1, size = 4) => {
  const response = await Author.get(
    `/orders/user-id?status=delivery&page=${Number(page)}&size=${Number(
      size
    )}&sort=DESC`
  );
  return response.data;
};

export const getDeliveredOrder = async (page = 1, size = 4) => {
  const response = await Author.get(
    `/orders/user-id?status=delivered&page=${Number(page)}&size=${Number(
      size
    )}&sort=DESC`
  );
  return response.data;
};

export const getConfirmOrder = async (page = 1, size = 4) => {
  const response = await Author.get(
    `/orders/user-id?status=confirm&page=${Number(page)}&size=${Number(
      size
    )}&sort=DESC`
  );
  return response.data;
};

export const getOrder = async (page = 1, size = 4) => {
  const response = await Author.get(
    `/orders/user-id?page=${Number(page)}&size=${Number(size)}&sort=DESC`
  );
  return response.data;
};

export const statusOrder = async (data) => {
  try {
    const response = await Author.put(`orders/${data.id}/order-status`, {
      order_status: data.order_status,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cancelOrder = async (data) => {
  try {
    const status = "Đã huỷ";
    const response = await Author.put(`orders/${data.id}/order-status`, {
      order_status: status,
      note: data.note,
    });
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

export const confirmOrder = async (orderId, status) => {
  try {
    const response = await Author.put(`orders/${orderId}/order-status`, {
      order_status: status
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deliverOrder = async (orderId, status) => {
  try {
    const response = await Author.put(`orders/${orderId}/order-status`, {
      order_status: status
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
