import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import Home from '../screens/home';
import Exercises from '../screens/exercises';
import Suggestions from '../screens/sugestions';
import Profile from '../screens/profile';
import Login from '../screens/login';

// Screen Names
const homeName = 'Calendar';
const exercisesName = 'Exercises';
const suggestionsName = 'Suggestions';
const profileName = 'Profile';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? 'calendar' : 'calendar';
          } else if (rn === exercisesName) {
            iconName = focused ? 'barbell' : 'barbell';
          } else if (rn === profileName) {
            iconName = focused ? 'person' : 'person';
          } else if (rn === suggestionsName) {
            iconName = focused ? 'bulb-outline' : 'bulb-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={homeName} component={Home} />
      <Tab.Screen name={exercisesName} component={Exercises} />
      <Tab.Screen name={suggestionsName} component={Suggestions} />
      <Tab.Screen name={profileName} component={Profile} />
    </Tab.Navigator>
  );
}

export default function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
