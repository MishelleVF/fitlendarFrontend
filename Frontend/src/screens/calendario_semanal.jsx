import React, { useState, useContext } from 'react';
import { Text, View, TouchableOpacity, Modal, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../estilos/calendarioSemanalStyle';
import ExerciseList from '../components/excercisesList';
import { EventContext } from '../context/EventContext';

const daysOfWeek = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const hoursOfDay = Array.from({ length: 25 }, (_, i) => i.toString().padStart(2, '0') + ":00");

const getWeekDates = () => {
    const current = new Date();
    const first = current.getDate() - current.getDay() + 1; // First day is the day of the month - the day of the week + 1 (Monday)
    const weekDates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(current);
        date.setDate(first + i);
        return date;
    });
    return weekDates;
};

const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month}/${date.getFullYear()}`;
};

export default function Calendario_Semanal() {
    const { events, postEventToGoogleCalendar } = useContext(EventContext);
    const [selectedRange, setSelectedRange] = useState({ day: null, startHour: null, endHour: null });
    const [isSelecting, setIsSelecting] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedExercises, setSelectExercise] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [postStatus, setPostStatus] = useState('');

    const weekDates = getWeekDates();

    const handleHourPress = (dayIndex, hour) => {
        if (isSelecting && selectedRange.day === dayIndex) {
            setSelectedRange(prevRange => ({
                ...prevRange,
                endHour: hour
            }));
        } else {
            setSelectedRange({ day: dayIndex, startHour: hour, endHour: hour });
            setIsSelecting(true);
        }
    };

    const handleConfirmSelection = async () => {
        setIsSelecting(false);
        const startHour = selectedRange.startHour.padStart(5, '0');
        const endHour = selectedRange.endHour.padStart(5, '0');
        const startDateTime = new Date(weekDates[selectedRange.day]);
        const endDateTime = new Date(weekDates[selectedRange.day]);
        
        startDateTime.setHours(parseInt(startHour.slice(0, 2), 10), 0, 0);
        endDateTime.setHours(parseInt(endHour.slice(0, 2), 10), 0, 0);

        setIsLoading(true);
        const result = await postEventToGoogleCalendar(startDateTime.toISOString(), endDateTime.toISOString());
        setIsLoading(false);

        if (result.success) {
            setPostStatus('Cargado correctamente al calendar');
        } else {
            setPostStatus('Error al cargar al calendar');
        }
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

    const isHourInRange = (dayIndex, hour) => {
        if (selectedRange.day !== dayIndex || selectedRange.startHour === null || selectedRange.endHour === null) {
            return false;
        }
        const start = parseInt(selectedRange.startHour, 10);
        const end = parseInt(selectedRange.endHour, 10);
        const current = parseInt(hour, 10);

        return start <= current && current <= end;
    };

    const isEventInHour = (dayIndex, hour) => {
        return events.some(event => {
            const eventDay = new Date(event.start.dateTime || event.start.date).getDay();
            const eventStartHour = new Date(event.start.dateTime || event.start.date).getHours();
            const eventEndHour = new Date(event.end.dateTime || event.end.date).getHours();
            const eventDayOfWeek = (eventDay + 6) % 7; // Adjust to match Monday start
            return eventDayOfWeek === dayIndex && eventStartHour <= parseInt(hour, 10) && parseInt(hour, 10) <= eventEndHour;
        });
    };

    const getEventTitle = (dayIndex, hour) => {
        const event = events.find(event => {
            const eventDay = new Date(event.start.dateTime || event.start.date).getDay();
            const eventStartHour = new Date(event.start.dateTime || event.start.date).getHours();
            const eventEndHour = new Date(event.end.dateTime || event.end.date).getHours();
            const eventDayOfWeek = (eventDay + 6) % 7; // Adjust to match Monday start
            return eventDayOfWeek === dayIndex && eventStartHour <= parseInt(hour, 10) && parseInt(hour, 10) <= eventEndHour;
        });
        return event ? event.summary : '';
    };

    return (
        <View style={styles.container}>
            <View style={styles.calendarContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View>
                        <View style={styles.daysRow}>
                            <View style={styles.hourColumnHeader} />
                            {daysOfWeek.map((day, index) => (
                                <View key={index} style={styles.dayColumnHeader}>
                                    <Text style={styles.dayHeader}>{day}</Text>
                                    <Text style={styles.dayHeader}>{formatDate(weekDates[index])}</Text>
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
                                {daysOfWeek.map((day, dayIndex) => (
                                    <View key={dayIndex} style={styles.dayColumn}>
                                        {hoursOfDay.map(hour => (
                                            <TouchableOpacity
                                                key={hour}
                                                style={[
                                                    styles.hourBlock,
                                                    isHourInRange(dayIndex, hour) ? styles.selectedHourBlock : null,
                                                    isEventInHour(dayIndex, hour) ? styles.eventHourBlock : null
                                                ]}
                                                onPress={() => handleHourPress(dayIndex, hour)}
                                                disabled={isEventInHour(dayIndex, hour)}
                                            >
                                                {isEventInHour(dayIndex, hour) && (
                                                    <Text style={styles.eventText}>{getEventTitle(dayIndex, hour)}</Text>
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

            {isLoading && (
                <Text style={styles.loadingText}>Cargando...</Text>
            )}

            {postStatus && (
                <Text style={styles.postStatus}>{postStatus}</Text>
            )}

            <Modal visible={modalVisible} animationType="slide">
                <View style={styles.modalContainer}>
                    <ExerciseList />
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
