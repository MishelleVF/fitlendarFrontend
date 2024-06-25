import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Importa el icono

const { width, height } = Dimensions.get('window');
// Asegúrate de actualizar la ruta de la imagen
import profileImage from 'C:/Users/crist/fitlendar/fitlendarFrontend/Frontend/assets/hombre.png';

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
            const response = await fetch('http://Fitlendar-LB-914168723.us-east-1.elb.amazonaws.com:8002/users/juancitotuviejo@gmail.com', {
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
            const response = await fetch('http://Fitlendar-LB-914168723.us-east-1.elb.amazonaws.com:8002/users/juancitotuviejo@gmail.com', { // Asegúrate de tener esta ruta configurada en Flask
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
                    <Image source={profile.foto} style={styles.profileImage} />
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>Hi, {profile.nombre}</Text>
                        <View style={styles.beginnerBar}>
                            <Text style={styles.beginnerText}>Beginner - 120 hrs</Text>
                        </View>
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

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#1C1C1E',
    },
    scrollView: {
        marginHorizontal: 10,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingHorizontal: 10,
    },
    profileImage: {
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: width * 0.1,
    },
    profileInfo: {
        flex: 1,
        marginLeft: 20,
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    beginnerBar: {
        backgroundColor: '#474B4E',
        borderRadius: 10,
        padding: 5,
        marginTop: 5,
    },
    beginnerText: {
        fontSize: 16,
        color: '#FFFFFF',
    },
    editButton: {
        padding: 10,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        marginTop: 20,
    },
    statBox: {
        width: width * 0.4,
        height: height * 0.1,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#2C2C2E',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    statText: {
        color: '#A0A0A0',
        fontSize: 16,
    },
    statValue: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 200,
        marginBottom: 20,
    }
});
