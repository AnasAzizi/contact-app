import axios from "axios";

const BASE_URL = "https://ms.itmd-b1.com:5123/api";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("jwtToken");
  }
  return null;
};

const ShowUsers = async () => {
  try {
    const token = getToken();
    const endpoint = "/Users";

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

const AddUser = async (formData, router) => {
  try {
    const token = getToken();
    const endpoint = "/Users";

    const response = await axios
      .post(`${BASE_URL}${endpoint}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Response data:", res.data);
        return res;
      })
      .catch((err) => {
        console.error("Error in POST request:", err.response.data);
        throw err;
      });

    if (response.status === 200) {
      router.push("/home/users");
    }
    return response;
  } catch (error) {
    console.error("Error adding contact:", error);
    throw error;
  }
};

const UserView = async (userId) => {
  try {
    const token = getToken();
    const endpoint = `/Users/${userId}`;
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("View User:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error View User:", error);
    throw error;
  }
};

const UserEdit = async (formData, userId) => {
  try {
    const token = getToken();
    const endpoint = `/Users/${userId}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log("formData test", formData);
    console.log("token test", token);
    console.log("endpoint test", endpoint);
    const response = await axios.put(
      `${BASE_URL}${endpoint}`,
      formData,
      config
    );
    console.log("Edit User:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error Edit User:", error);
    throw error;
  }
};

const CurrentUser = async () => {
  try {
    const token = getToken();
    const endpoint = "/Users/current-user";

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

const UserDelete = async (userId) => {
  try {
    const token = getToken();
    const endpoint = `/Users/${userId}`;
    const response = await axios.delete(`${BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("userId test", userId);
    console.log("user deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
export { ShowUsers, AddUser, UserView, UserEdit, CurrentUser ,UserDelete};
