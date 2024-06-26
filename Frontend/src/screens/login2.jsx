import React, {useState, useEffect} from 'react';
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
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "869271623477-pvhltl0ea9rg7n490em5beggbg8bmb4h.apps.googleusercontent.com",
    androidClientId: "869271623477-q4tdvgpoo1ttsmtthdc7ftl5ciprb38c.apps.googleusercontent.com",
    iosClientId: "869271623477-2etg9nmvc1c416gopdbgc6gd2lea0lkc.apps.googleusercontent.com",
    webClientId: "869271623477-a3ig6o0thocpqmtbuhumqpg66r1ugd9j.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleEffect();
  }, [response])

  // async function handleEffect() {
  //   // verificamos si ya hay usuario
  //   const user = await getLocalUser();
  //   if (!user) {
  //     // si no hay un usaario previo, hay que volver a obtener su informacion
  //     getUserInfo(response.authentication.accessToken);
  //   } else {
  //     setUserInfo(user);
  //   }
  // }

  async function handleEffect() {
    if (response?.type === 'success') {
      const { authentication } = response;
      getUserInfo(authentication.accessToken);
    } else {
      const user = await getLocalUser();
      if (user) {
        setUserInfo(user);
      }
    }
  }

  // para verificar previamanete que el usuario se haya guardado

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  }

  // manera de obtener los datos del usuario logueado
  const getUserInfo = async (token) => {
    if (!token){
      console.log("No existe token")
      return;
    }

    try {
      const response = await fetch (
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: {Authorization: `Bearer ${token}`},
        }
      );

      const user = await response.json();

      const localUser = await getLocalUser();

      // console.warn(user);
      // console.log(user);
      // await AsyncStorage.setItem("@user", JSON.stringify(user));
      // setUserInfo(user);
      
      // remplazar el localUser con la api
      if (localUser && localUser.email === user.email) {
        // Usuario ya registrado, navega a Home
        await AsyncStorage.setItem("@user", JSON.stringify(localUser));
        navigation.replace('Home');
      } else {
        // Usuario no registrado, navega a FormRegistro
        navigation.replace('FormRegistro', { name: user.name, email: user.email });
      }

      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);

    } catch (error) {
      console.log(error)
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={logo}
        style={styles.logostyle}
      />

      <Text style={styles.title}>INICIAR SESIÓN</Text>
      
      <TouchableOpacity style={styles.googleButton} onPress={() => {promptAsync();}}>
        <Icon name="google" size={20} color="#fff" />
        <Text style={styles.googleButtonText}>Continuar con Google</Text>
      </TouchableOpacity>
{/* 
      { !userInfo ? (
      <TouchableOpacity style={styles.googleButton} onPress={() => {promptAsync();}}>
        <Icon name="google" size={20} color="#fff" />
        <Text style={styles.googleButtonText}>Continuar con Google</Text>
      </TouchableOpacity>
      ) : (
      <View>
        <Text style={styles.title}>Email: {userInfo.email}</Text>
        <Text style={styles.title}>Name: {userInfo.name}</Text>
        <TouchableOpacity style={styles.googleButton} onPress={ async () => {await AsyncStorage.removeItem("@user"); }}>
          <Icon name="google" size={20} color="#fff" />
          <Text style={styles.googleButtonText}>reiniciar localStorage</Text>
        </TouchableOpacity>
      </View>  
      ) } */}

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
