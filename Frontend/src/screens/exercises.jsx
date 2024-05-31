import { Text, View, FlatList, Image, StyleSheet } from 'react-native';
import { exercisesStyle } from '../estilos/estilos'

import MakeExercise from './makeExercise';

import FloatingButton from '../components/floating';

import exercises from './ejercicios.json';

export default function Exercises(){
    return (
        // <View style={ exercisesStyle.view }>
        //     <Text style={ exercisesStyle.text }>Ejercicios</Text>
        // </View>
        <View style={styles.container_ejercicio_a}>
            <Text style={styles.header_ejercicio_a}>Ejercicios</Text>
            <FloatingButton onPress={ handlePress = () => {
              <MakeExercise />
            }}/>
            <FlatList
                data = {exercises}
                renderItem={({item}) => (
                    <View style={styles.card_ejercicio_a}>
                        <Image
                            source={{uri: item.foto || 'https://via.placeholder.com/150'}}
                            style = {styles.image_ejercicio_a}
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
        </View>
    )
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
  });