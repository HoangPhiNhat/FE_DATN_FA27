import axios from "axios";
import Author from "./baseApi/AuthorApi";

const handleUnauthorized = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
};

export const getAddress = async () => {
  try {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      handleUnauthorized();
      return [];
    }

    const response = await Author.get(`/shipping-addresses/user-id?size=10`);
    return response.data.data;
  } catch (error) {
    if (error?.response?.status === 401) {
      handleUnauthorized();
      return [];
    }
    throw error;
  }
};

export const addAddress = async (data) => {
  try {
    const response = await Author.post(`/shipping-addresses`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateAddress = async (data) => {
  try {
    const response = await Author.put(`/shipping-addresses/${data.id}`, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getProvince = async () => {
  try {
    const response = await Author.get(
      `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province`,
      {
        headers: {
          token: "09671701-9912-11ef-8e53-0a00184fe694",
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getDistrict = async (id) => {
  try {
    const response = await axios.get(
      `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district`,
      {
        params: {
          province_id: id,
        },
        headers: {
          token: "09671701-9912-11ef-8e53-0a00184fe694",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDistrict2 = async (id) => {
  const response = await Author.get(`districts/${id}`);
  return response.data;
};

export const getWard = async (id) => {
  try {
    const response = await axios.get(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward",
      {
        params: {
          district_id: id,
        },
        headers: {
          token: "09671701-9912-11ef-8e53-0a00184fe694",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching wards:", error);
    throw error;
  }
};
