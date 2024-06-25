import React, { useState, useRef } from 'react';
import { Text, View, Image, StyleSheet, TouchableWithoutFeedback, Animated, Modal } from 'react-native';
import * as Haptics from 'expo-haptics';

const ExerciseCard = ({ imageUri, title, descripcion, dificultad, equipo, peso, series, repeticiones, duracion }) => {
    const [isPressed, setIsPressed] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false);
    const scaleValue = useRef(new Animated.Value(1)).current;
    const timeoutRef = useRef(null);
    const backgroundColor = isPressed ? '#BBF247' : '#fff';

    const handlePressIn = () => {
        setIsPressed(true);
        Animated.spring(scaleValue, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();

        timeoutRef.current = setTimeout(() => {
            setPreviewVisible(true);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }, 200);
    };

    const handlePressOut = () => {
        setIsPressed(false);
        Animated.spring(scaleValue, {
            toValue: 1,
            useNativeDriver: true,
        }).start();

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    const handlePress = () => {
        console.log('Botón presionado');
    };

    const handleModalClose = () => {
        setPreviewVisible(false);
        handlePressOut();
    };

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={handlePress}
            >
                <Animated.View style={[styles.card, { transform: [{ scale: scaleValue }], backgroundColor }]}>
                    <Image
                        source={{ uri: imageUri || 'https://via.placeholder.com/150' }}
                        style={styles.image_ejercicio_card}
                    />
                    <View style={styles.text_box}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>

            {previewVisible && (
                <Modal
                    transparent={true}
                    animationType="fade"
                    visible={previewVisible}
                    onRequestClose={handleModalClose}
                >
                    <TouchableWithoutFeedback onPress={handleModalClose}>
                        <View style={styles.modalOverlay}>
                            <TouchableWithoutFeedback>
                                <View style={styles.preview}>
                                    <Image
                                        source={{ uri: imageUri || 'https://via.placeholder.com/150' }}
                                        style={styles.image_ejercicio_a}
                                    />
                                    <View style={styles.info_ejercicio_a}>
                                        <Text style={styles.title_ejercicio_a}>{title}</Text>
                                        <Text style={styles.description_ejercicio_a}>{descripcion}</Text>
                                        {dificultad ? <Text style={styles.detail_ejercicio_a}><Text style={styles.detailLabel}>Dificultad:</Text> {dificultad}</Text> : null}
                                        {equipo ? <Text style={styles.detail_ejercicio_a}><Text style={styles.detailLabel}>Equipo:</Text> {equipo}</Text> : null}
                                        {peso ? <Text style={styles.detail_ejercicio_a}><Text style={styles.detailLabel}>Peso:</Text> {peso} kg</Text> : null}
                                        {series ? <Text style={styles.detail_ejercicio_a}><Text style={styles.detailLabel}>Series:</Text> {series}</Text> : null}
                                        {repeticiones ? <Text style={styles.detail_ejercicio_a}><Text style={styles.detailLabel}>Repeticiones:</Text> {repeticiones}</Text> : null}
                                        {duracion ? <Text style={styles.detail_ejercicio_a}><Text style={styles.detailLabel}>Duración:</Text> {duracion} s</Text> : null}
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 120,
        width: '90%',
        borderRadius: 8,
        borderColor: '#000',
        borderWidth: 1,
        margin: 10,
        padding: 5,
    },
    image_ejercicio_card: {
        width: '50%',
        height: '100%',
        borderRadius: 8,
    },
    text_box: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: 10,
    },
    title: {
        color: '#000',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    preview: {
        width: 350,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    image_ejercicio_a: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    info_ejercicio_a: {
        width: '100%',
    },
    title_ejercicio_a: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    description_ejercicio_a: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
        textAlign: 'center',
    },
    detailContainer: {
        alignItems: 'flex-start',
        marginTop: 10,
    },
    detail_ejercicio_a: {
        fontSize: 16,
        marginBottom: 5,
    },
    detailLabel: {
        fontWeight: 'bold',
    },
});

export default ExerciseCard;

/*import React, { useState, useRef } from 'react';
import { Text, View, Image, StyleSheet, TouchableWithoutFeedback, Animated, Modal } from 'react-native';
import * as Haptics from 'expo-haptics';

const ExerciseCard = ({ imageUri, title, descripcion, dificultad, equipo, peso, series, repeticiones, duracion }) => {
    const [isPressed, setIsPressed] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false);
    const scaleValue = useRef(new Animated.Value(1)).current;
    const timeoutRef = useRef(null);
    const backgroundColor = isPressed ? '#BBF247' : '#fff';

    const handlePressIn = () => {
        setIsPressed(true);
        Animated.spring(scaleValue, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();

        

        timeoutRef.current = setTimeout(() => {
            setPreviewVisible(true);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }, 200);
        
    };

    const handlePressOut = () => {
        setIsPressed(false);
        Animated.spring(scaleValue, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
        
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    const handlePress = () => {
        console.log('Botón presionado');
    };

    const handleModalClose = () => {
        setPreviewVisible(false);
        handlePressOut();
    };

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={handlePress}
            >
                <Animated.View style={[styles.card, { transform: [{ scale: scaleValue }], backgroundColor }]}>
                    <Image
                        source={{ uri: imageUri }}
                        style={styles.image_ejercicio_card}
                    />
                    <View style={styles.text_box}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>

            {previewVisible && (
                <Modal
                    transparent={true}
                    animationType="fade"
                    visible={previewVisible}
                    onRequestClose={handleModalClose}
                >
                    <TouchableWithoutFeedback onPress={handleModalClose}>
                        <View style={styles.modalOverlay}>
                            <TouchableWithoutFeedback>
                                <View style={styles.preview}>
                                    <Image
                                        source={{ uri: imageUri || 'https://via.placeholder.com/150' }}
                                        style={styles.image_ejercicio_a}
                                    />
                                    <View style={styles.info_ejercicio_a}>
                                        <Text style={styles.title_ejercicio_a}>{title}</Text>
                                        <Text style={styles.description_ejercicio_a}>{descripcion}</Text>
                                        <Text style={styles.detail_ejercicio_a}>Dificultad: {dificultad}</Text>
                                        <Text style={styles.detail_ejercicio_a}>Equipo: {equipo}</Text>
                                        <Text style={styles.detail_ejercicio_a}>Peso: {peso} kg</Text>
                                        <Text style={styles.detail_ejercicio_a}>Series: {series}</Text>
                                        <Text style={styles.detail_ejercicio_a}>Repeticiones: {repeticiones}</Text>
                                        <Text style={styles.detail_ejercicio_a}>Duración: {duracion} s</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 120,
        width: '90%',
        borderRadius: 8,
        borderColor: '#000',
        borderWidth: 1,
        margin: 10,
        padding: 5,
    },
    image_ejercicio_card: {
        width: '50%',
        height: '100%',
        borderRadius: 8,
    },
    text_box: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: 10,
    },
    title: {
        color: '#000',
        fontSize: 18,
        textAlign: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    preview: {
        width: 400,
        height: 600,
        backgroundColor: '#fff',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ExerciseCard;
*/