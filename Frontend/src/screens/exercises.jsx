import React, { useState } from 'react';
import { Text, View, FlatList, Modal, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import ExerciseCard from '../components/exeriseCard';
import styles from '../estilos/exerciseStyle';
import exercises from './ejercicios.json';

export default function Exercises() {
  const [modalVisible, setModalVisible] = useState(false);
  
  // Formulario
  const [nombre, setNombre] = useState('');
  const [musculo, setMusculo] = useState('');
  const [series, setSeries] = useState('');
  const [repeticiones, setRepeticiones] = useState('');
  const [tiempo, setTiempo] = useState('');
  const [calorias, setCalorias] = useState('');

  // Enviar datos al backend
  const handleSubmit = () => {
    () => setModalVisible(false);
    fetch('API', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, musculo, series, repeticiones, tiempo, calorias }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Error en la solicitud');
      })
      // Manejar la respuesta del backend
      .then(data => {
        console.log('Datos guardados correctamente:', data);
        //Alert.alert('Éxito', 'Los datos se guardaron correctamente');
      })
      .catch(error => {
        console.error('Error al enviar los datos:', error.message);
        //Alert.alert('Error', 'Ocurrió un error al enviar los datos');
      });
  };

  return (
    <View style={styles.container}>
      
      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <ExerciseCard
            title={item.nombre}
            descripcion={item.descripcion}
            dificultad={item.dificultad}
            equipo={item.equipo}
            peso={item.peso}
            series={item.series}
            repeticiones={item.repeticiones}
            duracion={item.duracion}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />

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
          <View style={styles.modalContent}>
            <Text style={styles.form_title}>MI EJERCICIO:</Text>
            <Text style={styles.form_text_input_title}>Nombre del Ejercicio: </Text>
            <TextInput
              value={nombre}
              onChangeText={text => setNombre(text)}
              style={styles.form_text_input}
            />
            <Text style={styles.form_text_input_title}>Musculo: </Text>
            <TextInput
              value={musculo}
              onChangeText={text => setMusculo(text)}
              style={styles.form_text_input}
            />
            <Text style={styles.form_text_input_title}>Series: </Text>
            <TextInput
              value={series}
              onChangeText={text => setSeries(text)}
              style={styles.form_text_input}
            />
            <Text style={styles.form_text_input_title}>Repeticiones: </Text>
            <TextInput
              value={repeticiones}
              onChangeText={text => setRepeticiones(text)}
              style={styles.form_text_input}
            />
            <Text style={styles.form_text_input_title}>Tiempo estimado: </Text>
            <TextInput
              value={tiempo}
              onChangeText={text => setTiempo(text)}
              style={styles.form_text_input}
            />
            <Text style={styles.form_text_input_title}>Calorias aprox.: </Text>
            <TextInput
              value={calorias}
              onChangeText={text => setCalorias(text)}
              style={styles.form_text_input}
            />
            <View style={styles.from_button}>
              <TouchableOpacity style={styles.from_button_cerrar} onPress={() => setModalVisible(false)}>
                <Text>Cerrar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.from_button_enviar} onPress={handleSubmit}>
                <Text>Enviar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}