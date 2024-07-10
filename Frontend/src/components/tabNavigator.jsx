import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, View } from 'react-native';
import styles from '../estilos/tabNavigatorStyle';

// Screens
import Exercises from '../screens/exercises';
import Sugestions from '../screens/sugestions';
import Profile from '../screens/profile';
import Calendario_Semanal from '../screens/calendario_semanal';

// Screen Names
const homeName = 'Calendario_Semanal';
const exercisesName = 'Exercises';
const sugestionsName = 'Sugestions';
const profileName = 'Profile';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={styles.customButtonContainer}
    onPress={onPress}
  >
    <View style={styles.customButton}>
      {children}
    </View>
  </TouchableOpacity>
);

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
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      })}
    >
      <Tab.Screen
        name={homeName}
        component={Calendario_Semanal}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={exercisesName}
        component={Exercises}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={profileName}
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
