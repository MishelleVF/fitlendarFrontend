import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import Exercises from '../screens/exercises';
import Sugestions from '../screens/sugestions';
import Calendario_Semanal from '../screens/calendario_semanal';
import FormPerfil from '../screens/formperfil';
import CreateEventForm from '../screens/formEvent';

// Screen Names
const homeName = 'Calendario_Semanal';
const exercisesName = 'Exercises';
const sugestionsName = 'Sugestions';
const profileName = 'Profile';
const profileForm = 'FormPerfil'
const eventform = 'CreateEventForm';

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
          } else if (rn === profileForm) {
            iconName = focused ? 'person' : 'person';
          } else if (rn === eventform) {
            iconName = focused ? 'calendar' : 'calendar';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={homeName} component={Calendario_Semanal} />
      <Tab.Screen name={exercisesName} component={Exercises} />
      <Tab.Screen name={eventform} component={CreateEventForm} />
      <Tab.Screen name={profileForm} component={FormPerfil} />
    </Tab.Navigator>
  );
}
