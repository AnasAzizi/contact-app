import axiosClient from "@/pages/api/axiosClient";

const GetCompanies = async () => {
  try {
    const endpoint = "/Companies";
    const response = await axiosClient.get(`${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error retrieving contacts:", error);
    throw error;
  }
};

const EditCompanies = async (formData) => {
  try {
    const endpoint = `/Companies`;
    const response = await axiosClient.put(`${endpoint}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error Edit contact:", error);
    throw error;
  }
};

export { GetCompanies, EditCompanies };
