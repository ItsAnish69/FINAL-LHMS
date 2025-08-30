import API from "./../../api"; // ✅ fixed path
import { RootStackParamList, User } from ".././../navigation/types"; 
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Logo from "../../assets/images/logo.png";
import axios from "axios";

type LoginScreenNavProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

const Login: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://192.168.1.64:5000/api/auth/login", { email, password });
      const data = response.data;

      await AsyncStorage.setItem("token", response.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(response.data.user));

      const role = response.data.user.role?.toString().trim().toLowerCase();

      if (role === "borrower") {
        Alert.alert("Success", "Login successful", [
          {
            text: "Proceed",
            //@ts-ignore
            onPress: () => navigation.navigate("Home", { user: response.data.user }),
          },
        ]);
      } else {
        Alert.alert("Notice", "Only borrowers can access books.");
      }
    } catch (err: any) {
      console.log(err.response?.data || err.message);
      Alert.alert(
        "Login Failed",
        err.response?.data?.message || "Unknown error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image
          source={Logo || { uri: "https://iic.edu.np/image/favicon.png" }}
          style={{
            width: 200,
            height: 250,
            alignSelf: "center",
            marginBottom: 15,
          }}
        />
        <Text style={styles.subtitle}>If you have an account, log in now!</Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <FontAwesome5
            name="envelope"
            size={20}
            color='#000'
            style={styles.icon}
          />
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <FontAwesome5
            name="lock"
            size={20}
            color="#000"
            style={styles.icon}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Login Button */}
        <Pressable
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ed3453",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#000",
    position: "relative",
    bottom: 40,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#a19e9eff",
    borderRadius: 15,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#ffffffff",
    position: "relative",
    bottom: 30,
    height: 50,
  },
  icon: { marginRight: 10, color: "#555252ff" },
  input: { flex: 1, fontSize: 16, color: "#6c6969ff" },
  loginButton: {
    backgroundColor: "#ed3453",
    paddingVertical: 15,
    borderRadius: 15,
    marginBottom: 10,
    alignItems: "center",
    position: "relative",
    bottom: 25,
  },

  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
