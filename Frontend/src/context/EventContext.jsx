import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        loadEventsFromStorage();
    }, []);

    const loadEventsFromStorage = async () => {
        try {
            const storedEvents = await AsyncStorage.getItem('googleCalendarEvents');
            if (storedEvents) {
                setEvents(JSON.parse(storedEvents));
            }
        } catch (error) {
            console.error('Error loading events from storage:', error);
        }
    };

    const saveEventsToStorage = async (newEvents) => {
        try {
            await AsyncStorage.setItem('googleCalendarEvents', JSON.stringify(newEvents));
            setEvents(newEvents);
        } catch (error) {
            console.error('Error saving events to storage:', error);
        }
    };

    return (
        <EventContext.Provider value={{ events, saveEventsToStorage }}>
            {children}
        </EventContext.Provider>
    );
};
