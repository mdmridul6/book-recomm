import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import style from "../../assets/styles/login.styles";
import COLORS from "../../constants/colors";
import { useAuthStore } from "../../store/authStore";

export default function Login() {
  const { isLoading, login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    const result = await login(email, password);
    if (!result.success) Alert.alert("Error", result.error);
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={style.container}>
        {/* Illustration */}

        <View style={style.topIllustration}>
          <Image
            style={style.illustrationImage}
            source={require("../../assets/images/i.png")}
            resizeMode="contain"
          />
        </View>

        <View style={style.card}>
          <View style={style.formContainer}>
            <View style={style.inputGroup}>
              <Text style={style.label}>Email</Text>
              <View style={style.inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color={COLORS.primary}
                  style={style.inputIcon}
                />
                <TextInput
                  style={style.input}
                  placeholder="Enter your email"
                  placeholderTextColor={COLORS.placeholderText}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={style.inputGroup}>
              <Text style={style.label}>Password</Text>
              <View style={style.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={COLORS.primary}
                  style={style.inputIcon}
                />
                <TextInput
                  style={style.input}
                  placeholder="Enter your password"
                  placeholderTextColor={COLORS.placeholderText}
                  keyboardType="default"
                  value={password}
                  onChangeText={setPassword}
                  autoCapitalize="none"
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={style.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color={COLORS.primary}
                    style={style.inputIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={style.button}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={COLORS.white} />
              ) : (
                <Text style={style.buttonText}>Login</Text>
              )}
            </TouchableOpacity>

            {/* Footer */}
            <View style={style.footer}>
              <Text style={style.footerText}>Don&apos;t have an account?</Text>
              <Link href="/signup" asChild>
                <TouchableOpacity>
                  <Text style={style.link}>Sing Up</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
