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

    if (response.status === 200) {
      setTimeout(() => {
        router.push("/home/contacts");
      }, 500);
    }
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

const deleteContact = async (contactId) => {
  try {
    const token = getToken();
    const endpoint = `/Contacts/${contactId}`;
    const response = await axios.delete(`${BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("contactId", contactId);
    console.log("Contact deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting contact:", error);
    throw error;
  }
};

const viewContact = async (contactId) => {
  try {
    const token = getToken();
    const endpoint = `/Contacts/${contactId}`;
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("View User:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error View contact:", error);
    throw error;
  }
};

const editContact = async (formData, contactId) => {
  try {
    const token = getToken();
    const endpoint = `/Contacts/${contactId}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
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

const toggleFavorite = async (contactId) => {
  try {
    const token = getToken();
    const endpoint = `/Contacts/toggle-favorite${contactId}`;
    console.log("toggle favorite successfully:", contactId);

    const response = await axios.patch(`${BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("toggle favorite successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error toggle favorite:", error);
    throw error;
  }
};

const EmailSend = async (formData) => {
  try {
    const token = getToken();
    console.log("test token", token);
    console.log("test formData", formData);
    const endpoint = "/Contacts/send-email";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios
      .post(`${BASE_URL}${endpoint}`, formData, config)
      .then((res) => {
        console.log("Response data:", res.data);
        return res;
      })
      .catch((err) => {
        console.error("Error in send email:", err.response.data);
        throw err;
      });
  } catch (error) {
    console.error("Error adding contact:", error);
    throw error;
  }
};

const Activities = async () => {
  try {
    const token = getToken();
    const endpoint = "/logs";

    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error Activities :", error);
    throw error;
  }
};

export {
  AddContact,
  ShowContact,
  deleteContact,
  viewContact,
  editContact,
  toggleFavorite,
  EmailSend,
  Activities
};
