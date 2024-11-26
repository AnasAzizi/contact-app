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
        localStorage.setItem("jwtToken", token);
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

const resetPassword = async (email, router) => {
  try {
    const endpoint = "/forgot-password";
    const payload = { Email: email };

    const response = await axios.post(`${BASE_URL}${endpoint}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      console.log("Sending email successful:", response);
      router.push("/auth/reset-password");
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

  console.log("id type",typeof id)
  console.log("code type",typeof code)

  try {
    const endpoint = `/reset-password?id=${id}&code=${code}`;
    const payload = {
      setPassword: true, 
      password, 
      id:id,
      code:code
    };

    const response = await axios.post(`${BASE_URL}${endpoint}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      console.log("Reset password successful:", response);
      // router.push("/auth/sign-in");
    }

    return response;
  } catch (error) {
    console.error("Error:", error.response.data || error.message);
    throw error;
  }
};

export { RegisterUser, loginUser, resetPassword, setNewPassword };
