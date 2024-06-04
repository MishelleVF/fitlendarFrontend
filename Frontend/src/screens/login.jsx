import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import {GoogleButton} from 'react-google-button';
import LoginStyle from '../estilos/estilos.jsx';

export default function Login({ navigation }) {
  const handleLogin = () => {
    // Aquí puedes agregar la lógica de autenticación
    navigation.navigate('Home');
  };

  const handleGoogleLogin = () => {
    // Aquí puedes agregar la lógica de autenticación con Google
    navigation.navigate('Home');
  };

  return (
    <View style={LoginStyle.container}>
      <Image
        style={LoginStyle.logo}
        source={require('../../assets/logo.png')}
      />
      <GoogleButton
        onClick={handleGoogleLogin}
      />
      <TextInput
        style={LoginStyle.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
      />
      <TextInput
        style={LoginStyle.input}
        placeholder="Contraseña"
        secureTextEntry
      />
      <TouchableOpacity style={LoginStyle.button} onPress={handleLogin}>
        <Text style={LoginStyle.buttonText}>CONTINUAR</Text>
      </TouchableOpacity>
      <Text style={LoginStyle.forgotPassword}>¿Olvidó su contraseña?</Text>
      <Text style={LoginStyle.createAccount}>¿No tiene cuenta? Crear una cuenta</Text>
    </View>
  );
}
