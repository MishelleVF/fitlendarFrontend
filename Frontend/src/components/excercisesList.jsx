import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet, Modal, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import axios from 'axios';

import ExerciseCard from './exeriseCard';

const ExerciseList = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    // Función para obtener los datos de la API
    const fetchExercises = async () => {
      try {
        const response = await axios.get('http://fitlendar-lb-1465450486.us-east-1.elb.amazonaws.com:8001/ejercicios');
        setExercises(response.data);
      } catch (error) {
        console.error('Error al obtener los ejercicios:', error);
      }
    };
    fetchExercises();
  }, []);

  return (
    <FlatList
      data={exercises}  // Aquí estaba el error, debe ser data en lugar de ata
      renderItem={({ item }) => (
        <ExerciseCard
          imageUri={item.foto}
          title={item.nombre}
          descripcion={item.descripcion}
          dificultad={item.dificultad}
          tipo={item.tipo}
          equipo={item.equipo}
          musculo={item.musculo}
          peso={item.peso}
          series={item.series}
          repeticiones={item.repeticiones}
          duracion={item.duracion}
        />
      )}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
}

export default ExerciseList;