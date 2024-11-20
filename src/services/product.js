import UnAuthor from "./baseApi/UnAuthorApi";

let size = 5;

export const getProductAll = async (page, name) => {
  try {
    const response = await UnAuthor.get(
      `/products?page=${page}&size=${size}&sort=DESC`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductBySlug = async (slug) => {
  try {
    const response = await UnAuthor.get(`/products/${slug}`);

    return response;
  } catch (error) {
    throw error;
  }
};
