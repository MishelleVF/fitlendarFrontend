import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import estilos from '../estilos';

export default function SignUp({ navigation }) {
  const handleSignUp = () => {
    // Aquí puedes agregar la lógica de registro
    navigation.navigate('Home');
  };

  const handleGuest = () => {
    // Lógica para continuar como invitado
    navigation.navigate('Home');
  };

  return (
    <View style={estilos.container}>
      <Image
        style={estilos.logo}
        source={require('../assets/logo.png')}
      />
      <TextInput
        style={estilos.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
      />
      <TextInput
        style={estilos.input}
        placeholder="Contraseña"
        secureTextEntry
      />
      <TextInput
        style={estilos.input}
        placeholder="Confirmar contraseña"
        secureTextEntry
      />
      <TouchableOpacity style={estilos.button} onPress={handleSignUp}>
        <Text style={estilos.buttonText}>CONTINUAR</Text>
      </TouchableOpacity>
      <Text>¿Quieres continuar sin crear una cuenta?</Text>
      <TouchableOpacity style={estilos.guestButton} onPress={handleGuest}>
        <Text style={estilos.guestButtonText}>CONTINUAR COMO INVITADO</Text>
      </TouchableOpacity>
    </View>
  );
}
