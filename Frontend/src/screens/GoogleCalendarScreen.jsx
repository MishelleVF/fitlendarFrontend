import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';

WebBrowser.maybeCompleteAuthSession();

export function GoogleCalendarScreen() {
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "869271623477-npuhondudeshv20hrrdgp7sfn460vfno.apps.googleusercontent.com",
    iosClientId: "869271623477-npuhondudeshv20hrrdgp7sfn460vfno.apps.googleusercontent.com",
    androidClientId: "869271623477-npuhondudeshv20hrrdgp7sfn460vfno.apps.googleusercontent.com",
    webClientId: "869271623477-npuhondudeshv20hrrdgp7sfn460vfno.apps.googleusercontent.com"
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      setAccessToken(authentication.accessToken);
    } else if (response?.type === 'error') {
      setError(response.error);
    }
  }, [response]);

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
        <Text style={styles.successText}>Estás conectado</Text>
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
});
