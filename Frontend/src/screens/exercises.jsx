import React, { useState } from 'react';
import { Text, View, Modal, TouchableOpacity, TextInput, SafeAreaView, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

import ExerciseList from '../components/excercisesList.jsx';
import styles from '../estilos/exerciseStyle.jsx';

export default function Exercises() {
  const [modalVisible, setModalVisible] = useState(false);

  // Formulario
  const [foto, setFoto] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [dificultad, setDificultad] = useState('');
  const [tipo, setTipo] = useState('');
  const [equipo, setEquipo] = useState('');
  const [musculo, setMusculo] = useState('');
  const [peso, setPeso] = useState('');
  const [series, setSeries] = useState('');
  const [repeticiones, setRepeticiones] = useState('');
  const [duracion, setDuracion] = useState('');
  const [calorias, setCalorias] = useState('');

  // Estado para los ejercicios
  const [exercises, setExercises] = useState([]);

  const handleSubmit = async () => {
    setModalVisible(false);

    const exerciseData = {
      nombre,
      descripcion,
      dificultad,
      tipo,
      equipo,
      musculo,
      peso,
      series,
      repeticiones,
      duracion,
      foto,
      calorias
    };

    try {
      const response = await axios.post('http://fitlendar-lb-1465450486.us-east-1.elb.amazonaws.com:8001/ejercicios', exerciseData);
      console.log('Datos guardados correctamente:', response.data);
      Alert.alert('Éxito', 'Ejercicio guardado correctamente');
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      Alert.alert('Error', 'No se pudo enviar los datos. Por favor, intenta de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      <ExerciseList />
      <TouchableOpacity style={styles.floatingButton} onPress={() => setModalVisible(true)}>
        <Icon name="add" size={30} color="#000" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <SafeAreaView style={styles.modalContainer}>
          <ScrollView style={styles.modalContent}>
            <Text style={styles.form_title}>MI EJERCICIO:</Text>

            <Text style={styles.form_text_input_title}>Enlace de la Imagen: </Text>
            <TextInput
              value={foto}
              onChangeText={text => setFoto(text)}
              style={styles.form_text_input}
            />
            <Text style={styles.form_text_input_title}>Nombre del Ejercicio: </Text>
            <TextInput
              value={nombre}
              onChangeText={text => setNombre(text)}
              style={styles.form_text_input}
            />
            <Text style={styles.form_text_input_title}>Descripción: </Text>
            <TextInput
              value={descripcion}
              onChangeText={text => setDescripcion(text)}
              style={styles.form_text_input}
            />
            <Text style={styles.form_text_input_title}>Dificultad: </Text>
            <TextInput
              value={dificultad}
              onChangeText={text => setDificultad(text)}
              style={styles.form_text_input}
            />
            <Text style={styles.form_text_input_title}>Tipo: </Text>
            <TextInput
              value={tipo}
              onChangeText={text => setTipo(text)}
              style={styles.form_text_input}
            />
            <Text style={styles.form_text_input_title}>Equipo: </Text>
            <TextInput
              value={equipo}
              onChangeText={text => setEquipo(text)}
              style={styles.form_text_input}
            />
            <Text style={styles.form_text_input_title}>Musculo: </Text>
            <TextInput
              value={musculo}
              onChangeText={text => setMusculo(text)}
              style={styles.form_text_input}
            />
            <Text style={styles.form_text_input_title}>Peso: </Text>
            <TextInput
              value={peso}
              onChangeText={text => setPeso(text)}
              keyboardType="numeric"
              style={styles.form_text_input}
            />
            <Text style={styles.form_text_input_title}>Series: </Text>
            <TextInput
              value={series}
              onChangeText={text => setSeries(text)}
              keyboardType="numeric"
              style={styles.form_text_input}
            />
            <Text style={styles.form_text_input_title}>Repeticiones: </Text>
            <TextInput
              value={repeticiones}
              onChangeText={text => setRepeticiones(text)}
              keyboardType="numeric"
              style={styles.form_text_input}
            />
            <Text style={styles.form_text_input_title}>Duración: </Text>
            <TextInput
              value={duracion}
              onChangeText={text => setDuracion(text)}
              keyboardType="numeric"
              style={styles.form_text_input}
            />
            <Text style={styles.form_text_input_title}>Calorias: </Text>
            <TextInput
              value={calorias}
              onChangeText={text => setCalorias(text)}
              keyboardType="numeric"
              style={styles.form_text_input}
            />

            <View style={styles.form_button}>
              <TouchableOpacity style={styles.form_button_cerrar} onPress={() => setModalVisible(false)}>
                <Text>Cerrar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.form_button_enviar} onPress={handleSubmit}>
                <Text>Enviar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  );
}
