import React, { useState } from 'react';
import { Text, View, FlatList, Image, StyleSheet, Modal, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
    <View style={styles.container_ejercicio_a}>
      <Text style={styles.header_ejercicio_a}>Ejercicios</Text>
      
      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <View style={styles.card_ejercicio_a}>
            <Image
              source={{ uri: item.foto || 'https://via.placeholder.com/150' }}
              style={styles.image_ejercicio_a}
            />
            <View style={styles.info_ejercicio_a}>
              <Text style={styles.title_ejercicio_a}>{item.nombre}</Text>
              <Text style={styles.description_ejercicio_a}>{item.descripcion}</Text>
              <Text style={styles.detail_ejercicio_a}>Dificultad: {item.dificultad}</Text>
              <Text style={styles.detail_ejercicio_a}>Equipo: {item.equipo}</Text>
              <Text style={styles.detail_ejercicio_a}>Peso: {item.peso} kg</Text>
              <Text style={styles.detail_ejercicio_a}>Series: {item.series}</Text>
              <Text style={styles.detail_ejercicio_a}>Repeticiones: {item.repeticiones}</Text>
              <Text style={styles.detail_ejercicio_a}>Duración: {item.duracion} s</Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
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

const styles = StyleSheet.create({
    container_ejercicio_a: {
      flex: 1,
      backgroundColor: '#000',
      padding: 20,
    },
    header_ejercicio_a: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#fff'
    },
    card_ejercicio_a: {
      backgroundColor: '#f8f8f8',
      borderRadius: 8,
      padding: 15,
      marginRight: 15,
      width: 300,
      shadowColor: '#fff',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,
    },
    image_ejercicio_a: {
      width: '100%',
      height: 150,
      borderRadius: 8,
      marginBottom: 10,
    },
    info_ejercicio_a: {
      flex: 1,
    },
    title_ejercicio_a: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    description_ejercicio_a: {
      fontSize: 14,
      marginBottom: 10,
    },
    detail_ejercicio_a: {
      fontSize: 12,
      color: '#555',
    },
    floatingButton: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      backgroundColor: '#BBF247',
      borderRadius: 30,
      width: 60,
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      flex: 1,
      //justifyContent: 'center',
    },
    modalContent: {
      backgroundColor: '#fff',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
    },
    form_title: {
      marginBottom: 20,
      fontSize: 40,
      marginTop: 10,
    },
    from_button: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 30,
    },
    from_button_enviar: {
      backgroundColor: '#BBF247',
      paddingVertical: 20,
      paddingHorizontal: 40,
      borderRadius: 5,
      marginHorizontal: 40,
    },
    from_button_enviar_text: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
    },
    from_button_cerrar: {
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#000',
      paddingVertical: 20,
      paddingHorizontal: 40,
      borderRadius: 5,
      marginHorizontal: 40,
    },
    from_button_cerrar_text: {
      color: '#fff',
      textAlign: 'center',
      fontSize: 16,
      fontWeight: 'bold',
    },
    form_text_input: {
      marginBottom: 15,
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
    },
    form_text_input_title: {
      marginBottom: 2,
    },
  });