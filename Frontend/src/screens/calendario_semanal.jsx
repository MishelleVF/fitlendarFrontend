import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Modal, FlatList, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Asegúrate de importar la librería de iconos
import exercises from './ejercicios.json';
import styles from '../estilos/calendarioSemanalStyle';

const daysOfWeek = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const hoursOfDay = Array.from({ length: 25 }, (_, i) => i.toString().padStart(2, '0') + ":00");

export default function Calendario_Semanal() {
    const [selectedRange, setSelectedRange] = useState({ day: null, startHour: null, endHour: null });
    const [isSelecting, setIsSelecting] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedExercises, setSelectExercise] = useState([]);
    const [schedule, setSchedule] = useState([]);

    const handleHourPress = (day, hour) => {
        if (isSelecting && selectedRange.day === day) {
            setSelectedRange(prevRange => ({
                ...prevRange,
                endHour: hour
            }));
        } else {
            setSelectedRange({ day, startHour: hour, endHour: hour });
            setIsSelecting(true);
        }
    };

    const handleConfirmSelection = () => {
        setIsSelecting(false);
        setModalVisible(true);
    };

    const handleAddExercise = (exercise) => {
        setSelectExercise(prevExercises => [...prevExercises, exercise]);
    };

    const handleFinish = () => {
        setSchedule(prevSchedule => [
            ...prevSchedule,
            { ...selectedRange, exercises: selectedExercises }
        ]);
        setSelectExercise([]);
        setModalVisible(false);
    };

    const isHourInRange = (day, hour) => {
        if (selectedRange.day !== day || selectedRange.startHour === null || selectedRange.endHour === null) {
            return false;
        }
        const start = parseInt(selectedRange.startHour, 10);
        const end = parseInt(selectedRange.endHour, 10);
        const current = parseInt(hour, 10);

        return start <= current && current <= end;
    };

    return (
        <View style={styles.container}>
            <View style={styles.calendarContainer}>
                <ScrollView horizontal>
                    <View>
                        <View style={styles.daysRow}>
                            <View style={styles.hourColumnHeader} />
                            {daysOfWeek.map(day => (
                                <View key={day} style={styles.dayColumnHeader}>
                                    <Text style={styles.dayHeader}>{day}</Text>
                                </View>
                            ))}
                        </View>
                        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
                            <View style={styles.hourColumn}>
                                {hoursOfDay.map(hour => (
                                    <View key={hour} style={styles.hourBlock}>
                                        <Text style={styles.hourText}>{hour}</Text>
                                    </View>
                                ))}
                            </View>
                            <View style={styles.calendar}>
                                {daysOfWeek.map(day => (
                                    <View key={day} style={styles.dayColumn}>
                                        {hoursOfDay.map(hour => (
                                            <TouchableOpacity
                                                key={hour}
                                                style={[
                                                    styles.hourBlock,
                                                    isHourInRange(day, hour) ? styles.selectedHourBlock : null
                                                ]}
                                                onPress={() => handleHourPress(day, hour)}
                                            />
                                        ))}
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                </ScrollView>
            </View>

            {isSelecting && (
                <TouchableOpacity onPress={handleConfirmSelection} style={styles.confirmButton}>
                    <Icon name="add" size={30} color="#fff" /> {/* Usando el ícono de más */}
                </TouchableOpacity>
            )}

            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalHeader}>Añadir Ejercicio</Text>
                    <Text style={styles.modalSubHeader}>
                        Día: {selectedRange.day}, Horas: {selectedRange.startHour} - {selectedRange.endHour}
                    </Text>
                    <FlatList
                        data={exercises}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleAddExercise(item)} style={styles.exerciseCard}>
                                <View style={styles.exerciseInfo}>
                                    <Text style={styles.exerciseTitle}>{item.nombre}</Text>
                                    <Text style={styles.exerciseDescription}>{item.descripcion}</Text>
                                    <Text style={styles.exerciseDetail}>Dificultad: {item.dificultad}</Text>
                                    <Text style={styles.exerciseDetail}>Equipo: {item.equipo}</Text>
                                    <Text style={styles.exerciseDetail}>Peso: {item.peso} kg</Text>
                                    <Text style={styles.exerciseDetail}>Series: {item.series}</Text>
                                    <Text style={styles.exerciseDetail}>Repeticiones: {item.repeticiones}</Text>
                                    <Text style={styles.exerciseDetail}>Duración: {item.duracion} s</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                    <View style={styles.selectedExercises}>
                        {selectedExercises.map((exercise, index) => (
                            <Text key={index} style={styles.selectedExerciseText}>{exercise.nombre}</Text>
                        ))}
                    </View>
                    <TouchableOpacity onPress={handleFinish} style={styles.finishButton}>
                        <Text style={styles.finishButtonText}>Terminar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}
