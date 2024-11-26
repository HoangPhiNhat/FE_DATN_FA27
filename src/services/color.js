import UnAuthor from "./baseApi/UnAuthorApi";

export const getAllColor = async () => {
  const res = await UnAuthor.get(`/colors`);
  return res;
};
