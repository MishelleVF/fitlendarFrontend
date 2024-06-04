import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import {GoogleButton} from 'react-google-button';
import LoginStyle from '../estilos/estilos.jsx';

import { exercisesStyle } from '../estilos/estilos'

export function Login() {
    return (
      <View style={ exercisesStyle.view }>
        <Text style={ exercisesStyle.text }>Ejercicios</Text>
     </View>
    );
  }