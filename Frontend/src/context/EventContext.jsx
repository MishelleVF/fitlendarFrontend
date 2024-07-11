import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [accessToken, setAccessToken] = useState(null);

    const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "869271623477-pvhltl0ea9rg7n490em5beggbg8bmb4h.apps.googleusercontent.com",
    androidClientId: "869271623477-q4tdvgpoo1ttsmtthdc7ftl5ciprb38c.apps.googleusercontent.com",
    iosClientId: "869271623477-2etg9nmvc1c416gopdbgc6gd2lea0lkc.apps.googleusercontent.com",
    webClientId: "869271623477-a3ig6o0thocpqmtbuhumqpg66r1ugd9j.apps.googleusercontent.com",
        redirectUri: makeRedirectUri({
            useProxy: true,
        }),
        scopes: ['https://www.googleapis.com/auth/calendar.events'],
    });

    useEffect(() => {
        loadEventsFromStorage();

        if (response?.type === 'success') {
            const { authentication } = response;
            setAccessToken(authentication.accessToken);
            console.log('Access Token:', authentication.accessToken);
        }
    }, [response]);

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

    const postEventToGoogleCalendar = async (startDateTime, endDateTime) => {
        if (!accessToken) {
            console.log('Access token is missing, prompting user to authenticate...');
            await promptAsync();
            return;
        }

        try {
            const event = {
                summary: 'Rutina Ejercicios',
                start: {
                    dateTime: startDateTime,
                    timeZone: 'America/Lima',
                },
                end: {
                    dateTime: endDateTime,
                    timeZone: 'America/Lima',
                },
            };

            const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(event),
            });

            if (response.ok) {
                const event = await response.json();
                setEvents((prevEvents) => [...prevEvents, event]);
                await saveEventsToStorage([...events, event]);
                return { success: true };
            } else {
                console.error('Error posting event to Google Calendar:', response.statusText);
                return { success: false };
            }
        } catch (error) {
            console.error('Error posting event to Google Calendar:', error);
            return { success: false };
        }
    };

    return (
        <EventContext.Provider value={{ events, saveEventsToStorage, postEventToGoogleCalendar }}>
            {children}
        </EventContext.Provider>
    );
};
