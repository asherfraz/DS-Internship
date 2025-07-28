import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
})


export const register = async (data) => {
    try {
        const response = await api.post("/user/register", data);
        console.log(">>>: Register response :", response.data);
        return response.data;

    } catch (error) {
        console.error("Error registering user: ", error);
        return error;
    }
}

export const login = async (data) => {
    try {
        const response = await api.post("/user/login", data);
        console.log(">>>: Login response :", response.data);
        return response.data;
    } catch (error) {
        console.error("Error logging in user: ", error);
        return error;
    }
}
export const logout = async () => {
    try {
        const response = await api.post("/user/logout");
        console.log(">>>: Logout response :", response.data);
        return response.data;
    } catch (error) {
        console.error("Error logging out user: ", error);
        return error;
    }
}
export const refresh = async (data) => {
    try {
        const response = await api.post("/user/refresh", data);
        console.log(">>>: Refresh response :", response.data);
        return response.data;
    } catch (error) {
        console.error("Error refreshing user token: ", error);
        return error;
    }
}

