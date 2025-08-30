import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Auth/Login";
import Home from "./Auth/Home";
import BookDetail from "./Auth/bookdetail";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: { user: any };
  bookdetail: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="bookdetail" component={BookDetail} />
    </Stack.Navigator>
  );
};

export default App;
