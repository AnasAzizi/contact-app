import axios from "axios";

const BASE_URL = "https://ms.itmd-b1.com:5123/api";

const RegisterUser = async (formData, router) => {
  try {
    const endpoint = "/register";
    const response = await axios.post(`${BASE_URL}${endpoint}`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      console.log("Registration successful:", response);
      const firstName = formData.firstName;

      if (firstName) {
        localStorage.setItem("registeredName", JSON.stringify(firstName));
      }
      router.push("/auth/sign-in");
    }
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const loginUser = async (formData, router) => {
  try {
    const endpoint = "/login";
    const response = await axios.post(`${BASE_URL}${endpoint}`, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      console.log("Login successful:", response);
      const token = response.data.token;

      if (token) {
        localStorage.setItem("jwtToken", JSON.stringify(token));
      } else {
        console.warn("Missing JWT token in login response.");
      }
      router.push("/home/home-page");
    }
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export { RegisterUser, loginUser };
