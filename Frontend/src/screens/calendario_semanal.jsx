import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Modal, FlatList, StyleSheet, ScrollView } from 'react-native';
import exercises from './ejercicios.json';

const daysOfWeek = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const hoursOfDay = Array.from({ length: 24 }, (_, i) => `${i}:00`);

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
            setSelectedRange({ day, startHour: hour, endHour: hour })
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
            { ...selectedRange, exercises: selectedExercises }
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
            <ScrollView horizontal={true}>
                {daysOfWeek.map(day => (
                    <View key={day} style={styles.dayColumn}>
                        <Text style={styles.dayHeader}>{day}</Text>
                        <View style={styles.hourList}>
                            {hoursOfDay.map(hour => (
                                <TouchableOpacity
                                    key={hour}
                                    style={[
                                        styles.hourBlock,
                                        isHourInRange(day, hour) ? styles.selectedHourBlock : {}
                                    ]}
                                    onPress={() => handleHourPress(day, hour)}
                                >
                                    <Text style={styles.hourText}>{hour}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ))}
            </ScrollView>

            {isSelecting && (
                <TouchableOpacity onPress={handleConfirmSelection} style={styles.confirmButton}>
                    <Text style={styles.confirmButtonText}>Confirmar Selección</Text>
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
                            <View style={styles.exerciseItem}>
                                <Text style={styles.exerciseTitle}>{item.nombre}</Text>
                                {/* Render other exercise details here */}
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    calendar: {
        flexDirection: 'row',
        padding: 10,
    },
    dayColumn: {
        width: 120,
        marginRight: 10,
        backgroundColor: '#ffffff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4,
    },
    dayHeader: {
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: '#e0e0e0',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        textAlign: 'center',
    },
    hourList: {
        paddingVertical: 10,
    },
    hourBlock: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    selectedHourBlock: {
        backgroundColor: '#BBF247',
    },
    hourText: {
        textAlign: 'center',
        color: '#333',
    },
    confirmButton: {
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#4CAF50',
        borderRadius: 6,
        marginHorizontal: 20,
        marginVertical: 10,
    },
    confirmButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    modalHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    modalSubHeader: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    exerciseItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    closeButton: {
        padding: 10,
        backgroundColor: '#f00',
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
