import React, { useState, useEffect } from 'react';
import {
    View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, Modal, TextInput, Button, Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../estilos/profileStyle';

const { width, height } = Dimensions.get('window');

export default function Profile() {
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

    useEffect(() => {
        fetchUserData();
    }, []);

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
