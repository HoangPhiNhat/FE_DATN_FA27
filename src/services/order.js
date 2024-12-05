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
