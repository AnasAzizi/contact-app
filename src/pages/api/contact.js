import axiosClient from "@/pages/api/axiosClient";

const AddContact = async (formData) => {
  try {
    const endpoint = "/Contacts";
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const response = await axiosClient
      .post(`${endpoint}`, formData, config)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.error("Error in POST request:", err.response.data);
        throw err;
      });
    return response;
  } catch (error) {
    console.error("Error adding contact:", error);
    throw error;
  }
};

const ShowContact = async () => {
  try {
    const endpoint = "/Contacts";
    const response = await axiosClient.get(`${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error retrieving contacts:", error);
    throw error;
  }
};

const DeleteContact = async (contactId) => {
  try {
    const endpoint = `/Contacts/${contactId}`;
    const response = await axiosClient.delete(`${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting contact:", error);
    throw error;
  }
};

const ViewContact = async (contactId) => {
  try {
    const endpoint = `/Contacts/${contactId}`;

    const response = await axiosClient.get(`${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error View contact:", error);
    throw error;
  }
};

const EditContact = async (formData, contactId) => {
  try {
    const endpoint = `/Contacts/${contactId}`;
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axiosClient.put(`${endpoint}`, formData, config);
    return response.data;
  } catch (error) {
    console.error("Error Edit contact:", error);
    throw error;
  }
};

const ToggleFavorite = async (contactId) => {
  try {
    const endpoint = `/Contacts/toggle-favorite/${contactId}`;

    const response = await axiosClient.patch(`${endpoint}`);
    console.log("toggle favorite successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error toggle favorite:", error);
    throw error;
  }
};

const EmailSend = async (formData) => {
  try {
    const endpoint = "/Contacts/send-email";
    const response = await axiosClient
      .post(`${endpoint}`, formData)
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
    const endpoint = "/logs";

    const response = await axiosClient.get(`${endpoint}`);

    return response.data;
  } catch (error) {
    console.error("Error Activities :", error);
    throw error;
  }
};

export {
  AddContact,
  ShowContact,
  DeleteContact,
  ViewContact,
  EditContact,
  ToggleFavorite,
  EmailSend,
  Activities,
};
