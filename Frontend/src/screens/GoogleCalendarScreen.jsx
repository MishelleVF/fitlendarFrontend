import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import { format } from 'date-fns';

WebBrowser.maybeCompleteAuthSession();

export function GoogleCalendarScreen() {
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "869271623477-npuhondudeshv20hrrdgp7sfn460vfno.apps.googleusercontent.com",
    iosClientId: "869271623477-npuhondudeshv20hrrdgp7sfn460vfno.apps.googleusercontent.com",
    androidClientId: "869271623477-npuhondudeshv20hrrdgp7sfn460vfno.apps.googleusercontent.com",
    webClientId: "869271623477-npuhondudeshv20hrrdgp7sfn460vfno.apps.googleusercontent.com",
    scopes: ['https://www.googleapis.com/auth/calendar.readonly']
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      setAccessToken(authentication.accessToken);
      fetchEvents(authentication.accessToken);
    } else if (response?.type === 'error') {
      setError(response.error);
    }
  }, [response]);

  const fetchEvents = async (token) => {
    try {
      const now = new Date();
      const startOfDay = new Date(now.setHours(0, 0, 0, 0)).toISOString();
      const endOfDay = new Date(now.setHours(23, 59, 59, 999)).toISOString();

      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${startOfDay}&timeMax=${endOfDay}&singleEvents=true&orderBy=startTime`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setEvents(data.items || []);
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        disabled={!request}
        title="Conectar con Calendar"
        onPress={() => {
          promptAsync();
        }}
      />
      {accessToken ? (
        <>
          <Text style={styles.successText}>Estás conectado</Text>
          <FlatList
            data={events}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.eventItem}>
                <Text style={styles.eventTitle}>{item.summary}</Text>
                <Text style={styles.eventTime}>
                  Inicio: {format(new Date(item.start.dateTime || item.start.date), 'Pp')}
                </Text>
                <Text style={styles.eventTime}>
                  Fin: {format(new Date(item.end.dateTime || item.end.date), 'Pp')}
                </Text>
              </View>
            )}
          />
        </>
      ) : error ? (
        <Text style={styles.errorText}>Error: {error.message}</Text>
      ) : (
        <Text style={styles.infoText}>Presiona el botón para conectarte</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  successText: {
    color: 'green',
    marginTop: 20,
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    marginTop: 20,
    fontSize: 18,
  },
  infoText: {
    color: '#000',
    marginTop: 20,
    fontSize: 18,
  },
  eventItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventTime: {
    fontSize: 14,
  },
});
