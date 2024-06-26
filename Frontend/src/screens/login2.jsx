import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import logo from '../../assets/logo.png';

// librerias para googleloign
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

export function Login2({ navigation }) {

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "869271623477-pvhltl0ea9rg7n490em5beggbg8bmb4h.apps.googleusercontent.com",
    androidClientId: "869271623477-q4tdvgpoo1ttsmtthdc7ftl5ciprb38c.apps.googleusercontent.com",
    iosClientId: "869271623477-2etg9nmvc1c416gopdbgc6gd2lea0lkc.apps.googleusercontent.com",
    webClientId: "869271623477-a3ig6o0thocpqmtbuhumqpg66r1ugd9j.apps.googleusercontent.com",
  });


  return (
    <View style={styles.container}>
      <Image
        source={{logo}}
        style={styles.logostyle}
      />

      <Text style={styles.title}>INICIAR SESIÓN</Text>
      <TouchableOpacity style={styles.googleButton}>
        <Icon name="google" size={20} color="#fff" />
        <Text style={styles.googleButtonText} onPress={() => {
          promptAsync();
        }}>Continuar con Google</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry={true}
      />
      <Button mode="contained" onPress={() => navigation.replace('Home')} style={styles.button}>
        CONTINUAR
      </Button>
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>¿Olvidó su contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>navigation.replace('Signup')}>
        <Text style={styles.createAccount}>¿No tiene cuenta? <Text style={styles.createAccountLink}>Crear una cuenta</Text></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logostyle: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4285F4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  googleButtonText: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#4285F4',
    marginBottom: 20,
  },
  forgotPassword: {
    color: '#4285F4',
    marginBottom: 20,
},
  createAccount: {
    color: '#000',
  },
  createAccountLink: {
    color: '#4285F4',
    fontWeight: 'bold',
  },
});

export default Login2;
