import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TouchableOpacity, Modal, FlatList, StyleSheet, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../estilos/calendarioSemanalStyle';
import ExerciseList from '../components/excercisesList';
import { EventContext } from '../context/EventContext';

const daysOfWeek = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const hoursOfDay = Array.from({ length: 25 }, (_, i) => i.toString().padStart(2, '0') + ":00");

export default function Calendario_Semanal() {
    const { events } = useContext(EventContext);
    const [selectedRange, setSelectedRange] = useState({ day: null, startHour: null, endHour: null });
    const [isSelecting, setIsSelecting] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedExercises, setSelectExercise] = useState([]);
    const [schedule, setSchedule] = useState([]);
    // const [events, setEvents] = useState([]);

    // useEffect(() => {
    //     loadEventsFromStorage();
    // }, []);

    // const loadEventsFromStorage = async () => {
    //     try {
    //         const storedEvents = await AsyncStorage.getItem('googleCalendarEvents');
    //         if (storedEvents) {
    //             setEvents(JSON.parse(storedEvents));
    //         }
    //     } catch (error) {
    //         console.error('Error loading events from storage:', error);
    //         Alert.alert('Error', 'Failed to load events from storage');
    //     }
    // };

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

    const isEventInHour = (day, hour) => {
        return events.some(event => {
            const eventDay = new Date(event.start.dateTime || event.start.date).getDay();
            const eventStartHour = new Date(event.start.dateTime || event.start.date).getHours();
            const eventEndHour = new Date(event.end.dateTime || event.end.date).getHours();
            const eventDayOfWeek = daysOfWeek[eventDay];
            return eventDayOfWeek === day && eventStartHour <= parseInt(hour, 10) && parseInt(hour, 10) <= eventEndHour;
        });
    };

    const getEventTitle = (day, hour) => {
        const event = events.find(event => {
            const eventDay = new Date(event.start.dateTime || event.start.date).getDay();
            const eventStartHour = new Date(event.start.dateTime || event.start.date).getHours();
            const eventEndHour = new Date(event.end.dateTime || event.end.date).getHours();
            const eventDayOfWeek = daysOfWeek[eventDay];
            return eventDayOfWeek === day && eventStartHour <= parseInt(hour, 10) && parseInt(hour, 10) <= eventEndHour;
        });
        return event ? event.summary : '';
    };

    return (
        <View style={styles.container}>
            <View style={styles.calendarContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                    <View>
                        <View style={styles.daysRow}>
                            <View style={styles.hourColumnHeader} />
                            {daysOfWeek.map(day => (
                                <View key={day} style={styles.dayColumnHeader}>
                                    <Text style={styles.dayHeader}>{day}</Text>
                                </View>
                            ))}
                        </View>
                        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
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
                                                    isHourInRange(day, hour) ? styles.selectedHourBlock : null,
                                                    isEventInHour(day, hour) ? styles.eventHourBlock : null
                                                ]}
                                                onPress={() => handleHourPress(day, hour)}
                                                disabled={isEventInHour(day, hour)}
                                            >
                                                {isEventInHour(day, hour) && (
                                                    <Text style={styles.eventText}>{getEventTitle(day, hour)}</Text>
                                                )}
                                            </TouchableOpacity>
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
                    <Icon name="add" size={30} color="#fff" />
                </TouchableOpacity>
            )}

            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <ExerciseList/>
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