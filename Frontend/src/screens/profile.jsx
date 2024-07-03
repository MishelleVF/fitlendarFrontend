import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Importa el icono
import styles from '../estilos/profileStyle';

const { width, height } = Dimensions.get('window');
// Asegúrate de actualizar la ruta de la imagen


export default function Profile() {
    const [profile, setProfile] = useState({
        altura: '',
        nombre: '',
        peso: '',
        foto: ''
       
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [editableProfile, setEditableProfile] = useState({ ...profile });

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            
            const response = await fetch('http://fitlendar-lb-1465450486.us-east-1.elb.amazonaws.com:8002/users/nuevousuario@gmail.com', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Received non-JSON response from server');
            }
    
            const data = await response.json();
            setProfile({
                altura: data.altura,
                nombre: data.nombre,
                peso: data.peso,
                foto: data.foto
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    

    const saveProfile = async () => {
        await updateUserData();
        setModalVisible(false);
    };

    const updateUserData = async () => {
        try {
            const response = await fetch('http://fitlendar-lb-1465450486.us-east-1.elb.amazonaws.com:8002/users/nuevousuario@gmail.com', { // Asegúrate de tener esta ruta configurada en Flask
                method: 'PATCH', // o POST si así lo manejas
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editableProfile)
            });
            const data = await response.json();
            if (response.ok) {
                setProfile(editableProfile);
                alert('Datos actualizados correctamente');
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <ScrollView style={styles.scrollView}>
                <View style={styles.profileHeader}>
                    <Image source={{ uri: profile.foto }} style={styles.profileImage} />
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>Hi, {profile.nombre}</Text>
                        <Text style={styles.profiletext}>READY TO GO!!</Text>
                        
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
                        <Text style={styles.statValue}>{profile.calories}</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={styles.statText}>Horas</Text>
                        <Text style={styles.statValue}>{profile.hours}</Text>
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