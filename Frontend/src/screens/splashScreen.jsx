import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const authToken = await AsyncStorage.getItem('@auth_token');
        if (authToken) {
          // Si hay un token, redirige a la pantalla principal
          navigation.replace('Home');
        } else {
          // Si no hay token, redirige a la pantalla de login
          navigation.replace('Login');
        }
      } catch (error) {
        console.error('Error al verificar el token:', error);
        navigation.replace('Login');
      }
    };

    checkLoginStatus();
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default SplashScreen;
