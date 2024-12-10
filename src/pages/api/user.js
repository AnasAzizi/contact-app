import axiosClient from "@/pages/api/axiosClient";

const ShowUsers = async () => {
  try {
    const endpoint = "/Users";
    const response = await axiosClient.get(`${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error retrieving contacts:", error);
    throw error;
  }
};

const AddUser = async (formData) => {
  try {
    const endpoint = "/Users";
    const response = await axiosClient
      .post(`${endpoint}`, formData)
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

const UserView = async (userId) => {
  try {
    const endpoint = `/Users/${userId}`;
    const response = await axiosClient.get(`${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error View User:", error);
    throw error;
  }
};

const UserEdit = async (formData, userId) => {
  try {
    const endpoint = `/Users/${userId}`;
    const response = await axiosClient.put(`${endpoint}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error Edit User:", error);
    throw error;
  }
};

const CurrentUser = async () => {
  try {
    const endpoint = "/Users/current-user";
    const response = await axiosClient.get(`${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error retrieving contacts:", error);
    throw error;
  }
};

const UserDelete = async (userId) => {
  try {
    const endpoint = `/Users/${userId}`;
    const response = await axiosClient.delete(`${endpoint}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
export { ShowUsers, AddUser, UserView, UserEdit, CurrentUser, UserDelete };
