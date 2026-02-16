import { Link } from "expo-router";
import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAuthStore } from "../store/authStore";

export default function Index() {
  const { user, token, checkAuth, logout } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {token && <Text>Hello {user.username}</Text>}
      <Link href="/(auth)">Login</Link>
      <Link href="/(auth)/signup">Sign up</Link>

      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
