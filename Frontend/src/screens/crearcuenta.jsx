import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { login2 } from '../estilos/estilos.jsx';
import { exercisesStyle } from '../estilos/estilos';

import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';

import FormRegistro from './form_registro.jsx';

WebBrowser.maybeCompleteAuthSession();

export function Crear1({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "869271623477-pvhltl0ea9rg7n490em5beggbg8bmb4h.apps.googleusercontent.com",
    androidClientId: "869271623477-q4tdvgpoo1ttsmtthdc7ftl5ciprb38c.apps.googleusercontent.com",
    iosClientId: "869271623477-2etg9nmvc1c416gopdbgc6gd2lea0lkc.apps.googleusercontent.com",
    webClientId: "869271623477-a3ig6o0thocpqmtbuhumqpg66r1ugd9j.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      getUserInfo(authentication.accessToken);
    }
  }, [response]);

  const getUserInfo = async (token) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify({ ...user, registeredWithGoogle: true }));
      navigation.replace('FormRegistro', { name: user.name, email: user.email });
    } catch (error) {
      console.log(error);
    }
  };

  const registerAsGuest = async () => {
    const guestData = {
      email,
      password,
      confirmPassword,
      registeredWithGoogle: false,
    };
    await AsyncStorage.setItem("@user", JSON.stringify(guestData));
    navigation.replace('FormRegistro', { name: '', email: '' });
  };


  return (
    <View style={exercisesStyle.view}>
      <Text style={exercisesStyle.text}>Crear Cuenta</Text>

      <TextInput
        style={login2.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={login2.input}
        placeholder="Contraseña"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={login2.input}
        placeholder="Confirmar contraseña"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        style={login2.button}
        onPress={registerAsGuest}
      >
        <Text style={login2.buttonText}>CONTINUAR</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={login2.googleButton2}
        onPress={() => promptAsync()}
      >
        <Text style={login2.buttonText2}>Google button</Text>
      </TouchableOpacity>      
    </View>
  );
}

export default Crear1;