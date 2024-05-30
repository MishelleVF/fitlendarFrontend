import { Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


// Screens
import Home from '../screens/home';
import Exercises from '../screens/exercises';
import Profile from '../screens/profile';

// prueba
import Calendario_Semanal from '../screens/calendario_semanal';

// Screens Names
const homeName = 'Calendar';
const exercisesName = 'Exercises';
const profileName = 'Profile'

const Tab = createBottomTabNavigator();

export function Main() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName){
              iconName = focused ? 'calendar' : 'calendar';
            } else if (rn === exercisesName){
              iconName = focused ? 'barbell' : 'barbell';
            } else if (rn == profileName){
              iconName = focused ? 'person' : 'person';
            }

            return <Ionicons name={ iconName } size={ size } color={ color }/>

          },
        })}
      >
        <Tab.Screen name={homeName} component={ Calendario_Semanal }/>
        <Tab.Screen name={exercisesName} component={ Exercises }/>
        <Tab.Screen name={profileName} component={ Profile }/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
