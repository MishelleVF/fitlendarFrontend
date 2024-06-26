import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Platform } from 'react-native';
import * as Calendar from 'expo-calendar';

const CreateEventForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');
  const [allDay, setAllDay] = useState(false);
  const [recurrence, setRecurrence] = useState('');
  const [attendees, setAttendees] = useState('');
  const [reminders, setReminders] = useState('');
  const [color, setColor] = useState('');

  useEffect(() => {
    requestCalendarPermissions();
  }, []);

  const requestCalendarPermissions = async () => {
    if (Platform.OS === 'android') {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status !== 'granted') {
        alert('Permisos de calendario denegados');
        return false;
      }
    }
    return true;
  };

  const getDefaultCalendarId = async () => {
    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
    const defaultCalendar = calendars.find(calendar => calendar.source.name === 'Default' || calendar.source.name === 'iCloud');
    return defaultCalendar.id;
  };

  const createEvent = async () => {
    const calendarId = await getDefaultCalendarId();
    const eventDetails = {
      title,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      location,
      notes: description,
      allDay,
      recurrenceRule: recurrence ? { frequency: recurrence } : undefined,
      color,
    };

    try {
      const eventId = await Calendar.createEventAsync(calendarId, eventDetails);
      alert('Evento creado');
    } catch (error) {
      console.error(error);
      alert('Ocurrió un error al crear el evento');
    }
  };

  return (
    <View>
      <TextInput placeholder="Título" value={title} onChangeText={setTitle} />
      <TextInput placeholder="Descripción" value={description} onChangeText={setDescription} />
      <TextInput placeholder="Fecha y Hora de Inicio (YYYY-MM-DDTHH:mm:ss)" value={startDate} onChangeText={setStartDate} />
      <TextInput placeholder="Fecha y Hora de Finalización (YYYY-MM-DDTHH:mm:ss)" value={endDate} onChangeText={setEndDate} />
      <TextInput placeholder="Ubicación" value={location} onChangeText={setLocation} />
      <TextInput placeholder="Todo el Día (true/false)" value={allDay} onChangeText={value => setAllDay(value === 'true')} />
      <TextInput placeholder="Recurrencia (daily, weekly, monthly)" value={recurrence} onChangeText={setRecurrence} />
      <TextInput placeholder="Asistentes (emails separados por comas)" value={attendees} onChangeText={setAttendees} />
      <TextInput placeholder="Recordatorios (minutos antes separados por comas)" value={reminders} onChangeText={setReminders} />
      <TextInput placeholder="Color" value={color} onChangeText={setColor} />
      <Button title="Crear Evento" onPress={createEvent} />
    </View>
  );
};

export default CreateEventForm;
