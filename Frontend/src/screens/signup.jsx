import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { login2 } from '../estilos/estilos.jsx';
import { exercisesStyle } from '../estilos/estilos';

export function SignUp1({ navigation }) {
  return (
    <View style={exercisesStyle.view}>
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

      <TouchableOpacity
        style={login2.button}
        onPress={() => navigation.replace('Home')}
      >
        <Text style={login2.buttonText}>CONTINUAR</Text>
      </TouchableOpacity>

      <Text style={login2.guestText}>¿Quieres continuar sin crear una cuenta?</Text>

      <TouchableOpacity
        style={login2.guestButton}
        onPress={() => navigation.replace('Home')}
      >
        <Text style={login2.guestButtonText}>CONTINUAR COMO INVITADO</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={login2.googleButton2}
        onPress={() => navigation.replace('Home')}
      >
        <Text style={login2.buttonText2}>Google button</Text>
      </TouchableOpacity>
    </View>
  );
}
