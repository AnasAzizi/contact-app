import axios from "axios";

const BASE_URL = "https://ms.itmd-b1.com:5123/api";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("jwtToken");
  }
  return null;
};

const GetCompanies = async () => {
  try {
    const token = getToken();
    const endpoint = "/Companies";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(`${BASE_URL}${endpoint}`,config);

    return response.data;
  } catch (error) {
    console.error("Error retrieving contacts:", error);
    throw error;
  }
};

const EditCompanies = async (formData) => {
  try {
    const token = getToken();
    const endpoint = `/Companies`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log("test formData:",formData)
    const response = await axios.put(
      `${BASE_URL}${endpoint}`,
      formData,
      config
    );
    console.log("Edit User:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error Edit contact:", error);
    throw error;
  }
};


export { GetCompanies,EditCompanies };
