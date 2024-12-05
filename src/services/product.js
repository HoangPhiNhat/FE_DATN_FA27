import UnAuthor from "./baseApi/UnAuthorApi";

let limit = 8;

export const getProductAll = async (
  page,
  name,
  category,
  color,
  size,
  minPrice,
  maxPrice,
  sort
) => {
  try {
    let queryParams = `page=${page}&size=${limit}&sort=${sort || "DESC"}`;

    if (category) queryParams += `&categoryId=${category}`;
    if (color) queryParams += `&colorId=${color}`;
    if (size) queryParams += `&sizeId=${size}`;
    if (minPrice) queryParams += `&minPrice=${minPrice}`;
    if (maxPrice) queryParams += `&maxPrice=${maxPrice}`;
    if (name) queryParams += `&name=${name}`;

    const response = await UnAuthor.get(`/products?${queryParams}`);
    return response;
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

export const getProductAttById = async (id) => {
  try {
    const response = await UnAuthor.get(`products/${id}/productAtts`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
