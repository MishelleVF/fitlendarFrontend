import React, {useState} from 'react';
import { Text, View, TouchableOpacity, Modal, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import exercises from './ejercicios.json';
import ExerciseList from '../components/excercisesList.jsx';

import styles from '../estilos/calendarioSemanalStyle.jsx';

const daysOfWeek = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const hoursOfDay = Array.from({ length: 24 }, (_, i) => `${i}:00`);


export default function Calendario_Semanal(){
    const [selectedRange, setSelectedRange] = useState({ day: null, startHour: null, endHour: null });
    const [isSelecting, setIsSelecting] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const [selectedExercises, setSelectExercise] = useState([]);
    const [schedule, setSchedule] = useState([]);

    const handleHourPress = (day, hour) => {
        if (isSelecting && selectedRange.day == day) {
            setSelectedRange(prevRange => ({
                ...prevRange,
                endHour: hour
            }));
        }
        else {
            setSelectedRange({day, startHour: hour, endHour: hour})
            setIsSelecting(true);
        }
    }

    const handleConfirmSelection = () => {
        setIsSelecting(false);
        setModalVisible(true);
    }

    const handleAddExercise = (exercise) => {
        setSelectExercise(prevExercises => [...prevExercises, exercise]);
    };

    const handleFinish = () => {
        setSchedule(prevSchedule => [
            ...prevSchedule,
            {...selectedRange, exercises: selectedExercises}
        ]);
        setSelectExercise([]);
        setModalVisible(false);
    }

    const isHourInRange = (day, hour) => {
        if (selectedRange.day !== day || selectedRange.startHour === null || selectedRange.endHour === null) {
            return false;
        }
        const start = parseInt(selectedRange.startHour);
        const end = parseInt(selectedRange.endHour);
        const current = parseInt(hour);

        return start <= current && current <= end;
    };


    return (
        <View style={styles.container}>
            {/*<Text style={styles.header}>Calendario Semanal</Text>*/}
            <ScrollView>
                <View style={styles.calendar}>
                    {daysOfWeek.map(day => (
                        <View key={day} style={styles.dayColumn}>
                            <Text style={styles.dayHeader}>{day}</Text>
                            {hoursOfDay.map(hour => (
                                <TouchableOpacity
                                    key={hour}
                                    style={[
                                        styles.hourBlock,
                                        isHourInRange(day, hour) ? styles.selectedHourBlock : null
                                    ]}
                                    onPress={() => handleHourPress(day, hour)}
                                >
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}
                </View>
            </ScrollView>


            {isSelecting && (
                <TouchableOpacity onPress={handleConfirmSelection} style={styles.confirmButton}>
                    <Text style={styles.confirmButtonText}>Confirmar Selección</Text>
                </TouchableOpacity>
            )}

            <Modal visible={modalVisible} animationType="slide">
                <SafeAreaView style={styles.modalContainer}>
                    <ExerciseList/>
                    <View style={styles.selectedExercises}>
                        {selectedExercises.map((exercise, index) => (
                            <Text key={index}>{exercise.nombre}</Text>
                        ))}
                    </View>
                    <TouchableOpacity onPress={handleFinish} style={styles.finishButton}>
                        <Text style={styles.finishButtonText}>Terminar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Cerrar</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </Modal>
        </View>
    );
}
