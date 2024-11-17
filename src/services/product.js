import instance from "../configs/axios";

let size = 5;

export const getProductAll = async (page, name) => {
  try {
    const response = await instance.get(
      `/products?page=${page}&size=${size}&sort=DESC`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductBySlug = async (slug) => {
  try {
    console.log(slug);
    // const response = await instance.get(`/products/${slug}`);
    const response = await instance.get(`/products/${slug}/productAtts`);

    return response;
  } catch (error) {
    throw error;
  }
};
