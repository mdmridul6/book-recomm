import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  isLoading: false,
  register: async (username, email, password) => {
    try {
      set({ isLoaded: true });

      const response = await fetch(
        "https://book-recom-backend-d19u.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        },
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Something want Wrong!");

      AsyncStorage.setItem("user", JSON.stringify(data.user));
      AsyncStorage.setItem("token", JSON.stringify(data.token));

      set({ token: data.token, user: data.user, isLoading: false });

      return { success: true };
    } catch (error) {
      set({ isLoading: false });

      return { success: false, error: error.message };
    }
  },
  login: async (email, password) => {
    try {
      set({ isLoaded: true });

      const response = await fetch(
        "https://book-recom-backend-d19u.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Something want Wrong!");

      AsyncStorage.setItem("user", JSON.stringify(data.user));
      AsyncStorage.setItem("token", JSON.stringify(data.token));

      set({ token: data.token, user: data.user, isLoading: false });

      return { success: true };
    } catch (error) {
      set({ isLoading: false });

      return { success: false, error: error.message };
    }
  },
  checkAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userJson = await AsyncStorage.getItem("user");
      const user = await JSON.parse(userJson);
      set({ token, user });
    } catch (error) {
      console.log(`Auth check faield : ${error}`);
    }
  },
  logout: async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    set({ token: null, user: null });
  },
}));
