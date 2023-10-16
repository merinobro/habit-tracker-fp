import axios from "axios";
axios.defaults.withCredentials = true;

export const signup = async (dispatchUsers, data) => {
  try {
    const { username, email, password } = data;
    const response = await axios.post(`http://localhost:8000/auth/register`, {
      username,
      email,
      password,
    });

    dispatchUsers({ type: "REGISTER_USER", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (dispatchUsers, data) => {
  try {
    const { email, password } = data;
    const response = await axios.post(`http://localhost:8000/auth/login`, {
      email,
      password,
    });
    dispatchUsers({ type: "LOGIN_USER", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const getMyData = async () => {
  try {
    const response = await axios.get("http://localhost:8000/auth/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const logout = async (dispatchUsers) => {
  try {
    await axios.get(`http://localhost:8000/auth/logout`);
    dispatchUsers({type: "LOGOUT_USER"})
  } catch (error) {
    console.log(error);
  }
};


export const deleteAccount = async (dispatchUsers, user) => {
   try {
     const response = await axios.delete(`http://localhost:8000/auth/delete-account`, user);
    dispatchUsers({type: "DELETE_ACCOUNT", payload:response.data})
   } catch (error) {
    console.log(error);
   }
 }; 
 