import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TabNavigator } from "./tabNavigator";
import { Login } from "../screens/login";
import { login2 } from "../estilos/estilos";
import Login2 from "../screens/login2";
import { Crear1 } from "../screens/crearcuenta";

const Stack = createStackNavigator();

export function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login2} />
        <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Crear1} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}