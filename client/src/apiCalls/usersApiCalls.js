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
