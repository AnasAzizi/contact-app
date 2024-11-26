import axios from "axios";

const BASE_URL = "https://ms.itmd-b1.com:5123/api";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("jwtToken");
  }
  return null;
};

const AddContact = async (formData, router) => {
  try {
    const token = getToken();
    console.log("test token", formData);

    const endpoint = "/Contacts";
    
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await axios
      .post(`${BASE_URL}${endpoint}`, formData, config)
      .then((res) => {
        console.log("Response data:", res.data);
        return res; 
      })
      .catch((err) => {
        console.error("Error in POST request:", err.response.data);
        throw err; 
      });

    // if (response.status === 200) {
    //   router.push("/home/contacts");
    // }
    return response;
  } catch (error) {
    console.error("Error adding contact:", error);
    throw error;
  }
};

const ShowContact = async () => {
  try {
    const token = getToken();
    const endpoint = "/Contacts";

    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error retrieving contacts:", error);
    throw error;
  }
};

export { AddContact, ShowContact };
