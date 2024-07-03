import React, { useState, useRef } from 'react';
import { Text, View, Image, TouchableWithoutFeedback, Animated, Modal } from 'react-native';
import * as Haptics from 'expo-haptics';
import styles from '../estilos/exerciseCardStyles';

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

export default ExerciseCard;