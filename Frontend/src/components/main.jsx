import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { TabNavigator } from "./tabNavigator";
import { Login } from "../screens/login";

const Stack = createStackNavigator();

export function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}