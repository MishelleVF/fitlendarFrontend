import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import Home from '../screens/home';
import Exercises from '../screens/exercises';
import Sugestions from '../screens/sugestions';
import Profile from '../screens/profile';

// Screen Names
const homeName = 'Calendar';
const exercisesName = 'Exercises';
const sugestionsName = 'Sugestions';
const profileName = 'Profile';

const Tab = createBottomTabNavigator();

export function TabNavigator() {
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
          } else if (rn === sugestionsName) {
            iconName = focused ? 'bulb-outline' : 'bulb-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={homeName} component={Home} />
      <Tab.Screen name={exercisesName} component={Exercises} />
      <Tab.Screen name={sugestionsName} component={Sugestions} />
      <Tab.Screen name={profileName} component={Profile} />
    </Tab.Navigator>
  );
}