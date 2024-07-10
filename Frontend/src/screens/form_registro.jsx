import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { login2 } from '../estilos/estilos.jsx';
import { exercisesStyle } from '../estilos/estilos';
import style from '../estilos/registerStyle'
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function FormRegistro({ route, navigation }) {
  const { name: name_, email: email_, registeredWithGoogle: googleUser } = route.params;
  const [name, setName] = useState(name_ || '');
  const [email, setEmail] = useState(email_ || '');
  const [registeredWithGoogle, setGoogleUser] = useState(googleUser || false);
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [routineTime, setRoutineTime] = useState(50);
  const [routineLevel, setRoutineLevel] = useState(50);

  // para la ventana de alerta
  useEffect(() => {
    if (email_) {
      Toast.show({
        type: 'info',
        text1: 'El usuario no se ha registrado a Fitlander.',
        text2: 'Rellene el formulario para registrarse.',
        visibilityTime: 5000,
      });
    }
  }, []);

  // para asegurar que se pase un valor numerico y no se rompa el app
  const handleSliderChange = (value, setter) => {
    setter(parseFloat(value) || 0);
  };

  const completeRegistration = async () => {

    if (!name || !email || !age || !weight) {
        Toast.show({
          type: 'error',
          text1: 'Error de Registro',
          text2: 'Por favor, complete todos los campos del formulario.',
          visibilityTime: 5000,
        });
        return;
    }
    const userData = {
      name,
      email: email_,
      age,
      weight,
      routineTime,
      routineLevel,
      registeredWithGoogle: googleUser,
      completedRegistration: true,
    };
    await AsyncStorage.setItem("@user", JSON.stringify(userData));
    navigation.replace('Home');
    console.log(userData);
  };

  return (
    <View style={exercisesStyle.view}>
      <Text style={exercisesStyle.text}>Crear Cuenta</Text>
                                                                                                                                      
      <TextInput 
        style={login2.input}
        placeholder="Nombre"
        value = {name}
        onChangeText={setName}
      />

      <View style={style.edad_peso_reg}>
        <TextInput 
          style={[login2.input, { width: '30%' }]}
          placeholder="Edad"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />

        <TextInput 
          style={[login2.input, { width: '30%' }]}
          placeholder="Peso"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
      </View>

      <Text style={exercisesStyle.label}>¿Cuánto tiempo quieres disponer para tus rutinas?</Text>

      <Slider
        style={style.slider1_reg}
        minimumValue={1}
        maximumValue={100}
        step={25}
        value={routineTime}

        onValueChange={(value) => handleSliderChange(value, setRoutineTime)}
        minimumTrackTintColor="#C0F1FC"
        maximumTrackTintColor="#0500FF"
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>0 - No tengo mucho tiempo</Text>
        <Text>100 - Aprovechar al máximo</Text>
      </View>

      <Text style={exercisesStyle.label}>Mis rutinas serán</Text>
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={1}
        maximumValue={100}
        step={50}
        value={routineLevel}

        onValueChange={(value) => handleSliderChange(value, setRoutineLevel)}
        minimumTrackTintColor="#F8FEB4"
        maximumTrackTintColor="#FF0000"
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>0 - Relajadas</Text>
        <Text>50 - Moderadas</Text>
        <Text>100 - Exigentes</Text>
      </View>

      <TouchableOpacity
        style={login2.button}
        onPress={completeRegistration}
      >
        <Text style={login2.buttonText}>CONTINUAR</Text>
      </TouchableOpacity>
 
    </View>
  );
}


export default FormRegistro;