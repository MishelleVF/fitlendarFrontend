import React, { useState, useEffect, useContext } from 'react';
import {
    View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, Modal, TextInput, Button, Alert, FlatList, Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../estilos/profileStyle';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { format, startOfWeek, endOfWeek } from 'date-fns';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { EventContext } from '../context/EventContext';

WebBrowser.maybeCompleteAuthSession();

const { width, height } = Dimensions.get('window');

export default function Profile() {
    const { saveEventsToStorage } = useContext(EventContext);
    const [profile, setProfile] = useState({
        altura: '',
        nombre: '',
        peso: '',
        foto: '',
        racha: '',
        calorias_quemadas: ''
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [editableProfile, setEditableProfile] = useState({ ...profile });
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
        fetchUserData();
    }, []);

    useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            setAccessToken(authentication.accessToken);
            fetchEvents(authentication.accessToken);
        } else if (response?.type === 'error') {
            setError(response.error);
        }
    }, [response]);

    const fetchUserData = async () => {
        try {
            const response = await fetch('http://fitlendar-lb-1465450486.us-east-1.elb.amazonaws.com:8002/users/meneses@gmail.com', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setProfile(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const saveProfile = async () => {
        if (!editableProfile.nombre.trim() || editableProfile.peso <= 0 || editableProfile.altura <= 0) {
            Alert.alert('Error', 'Please enter all fields correctly.');
            return;
        }

        await updateUserData();
        setModalVisible(false);
    };

    const updateUserData = async () => {
        try {
            const response = await fetch('http://fitlendar-lb-1465450486.us-east-1.elb.amazonaws.com:8002/users/meneses@gmail.com', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editableProfile)
            });

            if (!response.ok) {
                throw new Error('Failed to update user data');
            }

            const data = await response.json();
            setProfile(editableProfile);
            Alert.alert('Success', 'Profile updated successfully');
        } catch (error) {
            console.error('Error updating user data:', error);
            Alert.alert('Error', 'Failed to update profile');
        }
    };

    const fetchEvents = async (token) => {
        try {
            const now = new Date();
            const startOfWeekDate = startOfWeek(now).toISOString();
            const endOfWeekDate = endOfWeek(now).toISOString();

            const response = await fetch(
                `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${startOfWeekDate}&timeMax=${endOfWeekDate}&singleEvents=true&orderBy=startTime`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();
            setEvents(data.items || []);
            // await saveEventsToStorage(data.items || []);
            saveEventsToStorage(data.items || []);
        } catch (error) {
            console.error(error);
            setError(error);
        }
    };

    // const saveEventsToStorage = async (events) => {
    //     try {
    //         await AsyncStorage.setItem('googleCalendarEvents', JSON.stringify(events));
    //         Alert.alert('Success', 'Events saved to storage');
    //     } catch (error) {
    //         console.error('Error saving events to storage:', error);
    //         Alert.alert('Error', 'Failed to save events to storage');
    //     }
    // };


    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <ScrollView style={styles.scrollView}>
                <View style={styles.profileHeader}>
                    <Image source={{ uri: profile.foto }} style={styles.profileImage} />
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>Hi, {profile.nombre}</Text>
                        <Text style={styles.profileText}>READY TO GO!!</Text>
                    </View>
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.editButton}>
                        <Icon name="pencil" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <Text style={styles.statText}>Peso</Text>
                        <Text style={styles.statValue}>{profile.peso}</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statText}>Talla</Text>
                        <Text style={styles.statValue}>{profile.altura}</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statText}>Calorías</Text>
                        <Text style={styles.statValue}>{profile.calorias_quemadas}</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statText}>Racha</Text>
                        <Text style={styles.statValue}>{profile.racha}</Text>
                    </View>
                </View>
                <Button
                    disabled={!request}
                    title="Sincronizar con Calendar"
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
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => setEditableProfile({ ...editableProfile, nombre: text })}
                                value={editableProfile.nombre}
                                placeholder="Nombre"
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => setEditableProfile({ ...editableProfile, peso: text ? Number(text) : '' })}
                                value={editableProfile.peso.toString()}
                                placeholder="Peso"
                                keyboardType="numeric"
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => setEditableProfile({ ...editableProfile, altura: text ? Number(text) : '' })}
                                value={editableProfile.altura.toString()}
                                placeholder="Altura"
                                keyboardType="numeric"
                            />
                            <Button title="Guardar Cambios" onPress={saveProfile} />
                            <Button title="Cancelar" color="#FF6347" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
}