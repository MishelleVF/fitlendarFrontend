import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
import { login2 } from '../estilos/estilos.jsx';
import { exercisesStyle } from '../estilos/estilos';

export function Crear1({ navigation }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [routineTime, setRoutineTime] = useState(50);
  const [routineLevel, setRoutineLevel] = useState(50);


  // para asegurar que se pase un valor numerico y no se rompa el app
  const handleSliderChange = (value, setter) => {
    setter(parseFloat(value) || 0);
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
        minimumValue={0}
        maximumValue={100}
        step={25}
        value={routineTime}

        onValueChange={(value) => handleSliderChange(value, setRoutineTime)}
        minimumTrackTintColor="#C0F1FC"
        maximumTrackTintColor="#0500FF"
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>0 - Cumplir nomás</Text>
        <Text>100 - Aprovechar al máximo</Text>
      </View>

      <Text style={exercisesStyle.label}>Mis rutinas serán</Text>
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={0}
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

const style = StyleSheet.create({
  edad_peso_reg : {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  slider1_reg : {
    width: '100%',
    height: 40,
  }
})