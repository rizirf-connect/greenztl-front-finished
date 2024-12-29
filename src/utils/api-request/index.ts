import axios, { AxiosRequestConfig } from "axios";
import store from "@/store/store";
import { API_BASE_URL } from "@/constants";
import { clearUser } from "@/store/slices/user.slice";
import { toast } from "react-toastify";

export interface ApiRequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  headers?: Record<string, string>;
}

const apiRequest = async (
  url: string,
  { method = "GET", body = null, headers = {} }: ApiRequestOptions = {}
) => {
  try {
    const state = store.getState();
    const authToken = state.user.token;

    const config: AxiosRequestConfig = {
      url: API_BASE_URL + url,
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    if (authToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${authToken}`,
      };
    }

    if (body) {
      config.data = body;
    }
    const response = await axios(config);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error(`API request failed: ${error.response.data}`);
      if (
        (error.response.status === 401 &&
          error.response.data.message === "Invalid or expired token") ||
        error.response.data.message === "Authorization token is required"
      ) {
        store.dispatch(clearUser());
        toast.error("You are not logged in!");
      }
      throw new Error(error.response.data.message || "Something went wrong!");
    } else {
      console.error(`Error with API request: ${error.message}`);
      throw new Error("Network error or invalid request!");
    }
  }
};

export default apiRequest;
