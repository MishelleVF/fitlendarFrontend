import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Modal, FlatList, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import exercises from './ejercicios.json';

const daysOfWeek = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const hoursOfDay = Array.from({ length: 24 }, (_, i) => `${i}:00`);

export default function Calendario_Semanal() {
    const [selectedRange, setSelectedRange] = useState({ day: null, startHour: null, endHour: null });
    const [isSelecting, setIsSelecting] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [events, setEvents] = useState([]);
    const [selectedExercises, setSelectExercise] = useState([]);
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        // Obtener los eventos de Google Calendar al montar el componente
        const fetchEvents = async () => {
            try {
                const accessToken = await getAccessToken(); // Asegúrate de obtener y manejar el token de acceso correctamente
                const response = await axios.get(`https://www.googleapis.com/calendar/v3/calendars/primary/events`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                setEvents(response.data.items);
            } catch (error) {
                console.error(error);
            }
        };

        fetchEvents();
    }, []);

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
        const start = parseInt(selectedRange.startHour);
        const end = parseInt(selectedRange.endHour);
        const current = parseInt(hour);

        return start <= current && current <= end;
    };

    const getDayIndex = (date) => {
        const day = new Date(date).getDay();
        return day === 0 ? 6 : day - 1; // Ajusta para que el domingo sea el último día de la semana
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.calendar}>
                    {daysOfWeek.map((day, dayIndex) => (
                        <View key={day} style={styles.dayColumn}>
                            <Text style={styles.dayHeader}>{day}</Text>
                            {hoursOfDay.map(hour => (
                                <TouchableOpacity
                                    key={hour}
                                    style={[
                                        styles.hourBlock,
                                        isHourInRange(day, hour) ? styles.selectedHourBlock : null,
                                        events.some(event => {
                                            const eventStart = new Date(event.start.dateTime).getHours();
                                            const eventEnd = new Date(event.end.dateTime).getHours();
                                            return getDayIndex(event.start.dateTime) === dayIndex && eventStart <= parseInt(hour) && parseInt(hour) < eventEnd;
                                        }) ? styles.occupiedHourBlock : null
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
                <View style={styles.modalContainer}>
                    <Text style={styles.modalHeader}>Añadir Ejercicio</Text>
                    <Text style={styles.modalSubHeader}>
                        Día: {selectedRange.day}, Horas: {selectedRange.startHour} - {selectedRange.endHour}
                    </Text>
                    <FlatList
                        data={exercises}
                        renderItem={({ item }) => (
                            <View style={styles.card_ejercicio_a}>
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
                                <TouchableOpacity onPress={() => handleAddExercise(item)} style={styles.addButton}>
                                    <Text style={styles.addButtonText}>Añadir</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
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
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#000',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    calendar: {
        flexDirection: 'row',
    },
    dayColumn: {
        flex: 1,
        margin: 5,
    },
    dayHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        marginBottom: 5,
    },
    hourBlock: {
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#fff',
        padding: 10,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedHourBlock: {
        backgroundColor: '#BBF247',
    },
    occupiedHourBlock: {
        backgroundColor: '#FF0000',
    },
    confirmButton: {
        padding: 15,
        backgroundColor: '#BBF247',
        borderRadius: 5,
        alignItems: 'center',
        margin: 10,
    },
    confirmButtonText: {
        color: '#000',
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
    card_ejercicio_a: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
    info_ejercicio_a: {
        marginBottom: 10,
    },
    title_ejercicio_a: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description_ejercicio_a: {
        fontSize: 14,
    },
    detail_ejercicio_a: {
        fontSize: 12,
    },
    addButton: {
        padding: 10,
        backgroundColor: '#4285F4',
        borderRadius: 5,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    selectedExercises: {
        marginTop: 10,
    },
    finishButton: {
        padding: 10,
        backgroundColor: '#BBF247',
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    finishButtonText: {
        color: '#000',
        fontWeight: 'bold',
    },
    closeButton: {
        padding: 10,
        backgroundColor: '#f00',
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
