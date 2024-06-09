import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, TouchableOpacity, Image, Button } from 'react-native';
import { login2 } from '../estilos/estilos.jsx';

import { exercisesStyle } from '../estilos/estilos'

// para el login con google
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';

WebBrowser.maybeCompleteAuthSession();

// web: 
// 869271623477-5ntcb773jgqag482mh1q4bmtu2ueeh4n.apps.googleusercontent.com
// android:
// 869271623477-tj44aokf8hrtr7po395dfa7ekd8ngi7c.apps.googleusercontent.com
// ios:
// 869271623477-f5j1vak0g4pkg53mkk2es03nnsu3p1ve.apps.googleusercontent.com

export function Login() {
  // variables para el login de google
  const [userInfo, setUserInfo] = React.useState(null);
  const [request, response, promptAsync ] = Google.useAuthRequest({
    iosClientId:"869271623477-f5j1vak0g4pkg53mkk2es03nnsu3p1ve.apps.googleusercontent.com",
    androidClientId:"869271623477-tj44aokf8hrtr7po395dfa7ekd8ngi7c.apps.googleusercontent.com",
    webClientId: "869271623477-5ntcb773jgqag482mh1q4bmtu2ueeh4n.apps.googleusercontent.com"
  });

  React.useEffect(() => {
    handleSignWithGoogle();
  }, [response])

  // revisa si hay un usuario localmente
  async function handleSignWithGoogle() {
    const user = await getLocalUser();
    if (!user) {
      if (response?.type === "success") {
        // response tiene permisos que queramos del usuario
        getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(user);
    }
  }

  // funcion para verificar si es que ya se ha logueado el usario y no volver a pedir un ingreso
  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };

  // función para obtener la informciacon del usuario con el token del usuario
  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (e) {console.log(e)} // si no atrapa nada muestra el error en consola
  };

  return (
    <View style={ exercisesStyle.view }>
      <Text style={exercisesStyle.text}>Login</Text>
      <TextInput
        style={login2.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
      />

      <TextInput
        style={login2.input}
        placeholder="Contraseña"
        secureTextEntry={true}
      />

      <TextInput
        style={login2.input}
        placeholder="Confirmar contraseña"
        secureTextEntry={true}
      />
      
      <TouchableOpacity style={login2.button}>
        <Text style={login2.buttonText}>CONTINUAR</Text>
      </TouchableOpacity>

      <Text style={login2.guestText}>Quieres continuar sin crear una cuenta?</Text>

      <TouchableOpacity style={login2.guestButton}>
        <Text style={login2.guestButtonText}>CONTINUAR COMO INVITADO</Text>
      </TouchableOpacity>

      {!userInfo ? (
        <Button 
          title="Sign in with Google"
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
        />
      ) : (
        <View>
          {userInfo?.picture && (
            <Image source={{ uri: userInfo?.picture }} />
          )}
          <Text>Email: {userInfo.email}</Text>
          <Text>
            Verified: {userInfo.verified_email ? "yes" : "no"}
          </Text>
          <Text>Name: {userInfo.name}</Text>
        </View>
      )}
      {/* <TouchableOpacity style={login2.googleButton2}>
          <Text style={login2.buttonText2}>Google button</Text>
      </TouchableOpacity> */}
      <Button
        title="remove local store"
        onPress={async () => await AsyncStorage.removeItem("@user")}
      />

    </View>
  );
}

