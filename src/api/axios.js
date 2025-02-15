import axios from "axios";

axios.defaults.withCredentials = true;

export const getTodos = async () => {
  try {
    const response = await axios.get("http://52.79.236.2/api/todo", {
      headers: { Authorization: document.cookie.split("=")[1] },
    });
    const result = response.data["todoList"].sort(
      (a, b) => new Date(a["duedateAt"]) - new Date(b["duedateAt"])
    );
    return result;
  } catch (error) {
    console.log("Get TodoList Error : ", error.response);
    throw error;
  }
};

export const getTodo = async (id) => {
  try {
    const response = await axios.get(`http://52.79.236.2/api/detail/${id}`, {
      headers: { Authorization: document.cookie.split("=")[1] },
    });
    return response.data["todo"];
  } catch (error) {
    console.log("Get error : ", error.message);
    throw error;
  }
};

export const postTodo = async (todo) => {
  try {
    await axios.post("api/todo", todo, {
      headers: { Authorization: document.cookie.split("=")[1] },
    });
    console.log(todo);
    console.log(todo["duedateAt"]);
    console.log(typeof new Date(todo["duedateAt"]));
  } catch (error) {
    console.log("Post Error : ", error.response);
    throw error;
  }
};

export const changeTodo = async (id, todo) => {
  try {
    await axios.put(`http://52.79.236.2/api/detail/${id}`, todo, {
      headers: { Authorization: document.cookie.split("=")[1] },
    });
  } catch (error) {
    console.log("Change Error : ", error.response);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    await axios.delete(`http://52.79.236.2/api/todo/${id}`, {
      headers: { Authorization: document.cookie.split("=")[1] },
    });
  } catch (error) {
    console.log("Delete error : ", error.message);
    throw error;
  }
};

export const completeTodo = async (id) => {
  try {
    await axios.patch(`http://52.79.236.2/api/todo/${id}`, {
      headers: { Authorization: document.cookie.split("=")[1] },
    });
  } catch (error) {
    console.log("Complete error : ", error.message);
    throw error;
  }
};

export const getCompleteTodos = async () => {
  try {
    const response = await axios.get("api", {
      headers: { Authorization: document.cookie.split("=")[1] },
    });
    console.log(response.data["doneList"]);
    return response.data["doneList"];
  } catch (error) {
    console.log("Get CompleteList error: ", error.message);
    throw error;
  }
};

export const login = async (userInfo) => {
  try {
    await axios.post("http://52.79.236.2/api/login", userInfo, {
      withCredentials: true,
    });
  } catch (error) {
    console.log("Login Error : ", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await axios.post("http://52.79.236.2/api/logout", {
      headers: { Authorization: document.cookie.split("=")[1] },
    });
  } catch (error) {
    console.log("Logout Error : ", error);
    throw error;
  }
};

export const signUp = async (userInfo) => {
  try {
    await axios.post("http://52.79.236.2/api/signup", userInfo);
  } catch (error) {
    console.log("SingUp Error : ", error);
    throw error;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await axios.get("http://52.79.236.2/api/auth", {
      headers: { Authorization: document.cookie.split("=")[1] },
    });
    return response.data["userInfo"];
  } catch (error) {
    console.log("getUserInfo Error : ", error);
    throw error;
  }
};
