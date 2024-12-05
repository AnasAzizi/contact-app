import axiosClient from "@/pages/api/axiosClient";

const RegisterUser = async (formData) => {
  try {
    const endpoint = "/register";
    const response = await axiosClient.post(`${endpoint}`, formData);
    if (response.status === 200) {
      console.log("Registration successful:", response);
    }
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const loginUser = async (formData) => {
  try {
    const endpoint = "/login";
    const response = await axiosClient.post(`${endpoint}`, formData);
    if (response.status === 200) {
      console.log("Login successful:", response);
      const token = response.data.token;
      return token;
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const resetPassword = async (email) => {
  try {
    const endpoint = "/forgot-password";
    const payload = { Email: email };
    const response = await axiosClient.post(`${endpoint}`, payload);
    if (response.status === 200) {
      console.log("Sending email successful:", response);
    }

    return response;
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    throw error;
  }
};

const setNewPassword = async (password, router) => {
  const id = router.query.id;
  const code = router.query.code;

  console.log("id", id);
  console.log("code", code);

  try {
    const endpoint = `/reset-password?id=${id}&code=${code}`;
    const payload = {
      setPassword: true,
      password,
      id: id,
      code: code,
    };
    const response = await axiosClient.post(`${endpoint}`, payload);
    if (response.status === 200) {
      console.log("Reset password successful:", response);
    }

    return response;
  } catch (error) {
    console.error("Error:", error.response.data || error.message);
    throw error;
  }
};

export { RegisterUser, loginUser, resetPassword, setNewPassword };
