import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import profileImage from 'C:/Users/crist/fitlendar/fitlendarFrontend/Frontend/assets/hombre.png'; // Ajusta la ruta según sea necesario

export default function Profile() {
    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <StatusBar style="light" />
            {/* punchline and avatar */}
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={[styles.text, styles.textNeutral]}>READY TO GO</Text>
                    <Text style={[styles.text, styles.textRose]}>CRISTOPHER</Text>
                </View>
                <Image source={profileImage} style={styles.avatar} />
            </View>
            {/* Cuadros para los datos */}
            <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                    <Text style={styles.statText}>Peso</Text>
                    <Text style={styles.statValue}>70 kg</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statText}>Talla</Text>
                    <Text style={styles.statValue}>175 cm</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statText}>Calorías</Text>
                    <Text style={styles.statValue}>2000 kcal</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statText}>Horas</Text>
                    <Text style={styles.statValue}>8 h</Text>
                </View>
            </View>
            {/* Actividades */}
            <View style={styles.activitiesContainer}>
                <Text style={styles.activitiesTitle}>Today</Text>
                <View style={styles.activityRow}>
                    <View style={styles.activity}>
                        <Image source={require('C:/Users/crist/fitlendar/fitlendarFrontend/Frontend/assets/gym1.jpeg')} style={styles.activityImage} />
                        <Text style={styles.activityText}>Bench Press</Text>
                    </View>
                    <View style={styles.activity}>
                        <Image source={require('C:/Users/crist/fitlendar/fitlendarFrontend/Frontend/assets/biceps.jpeg')} style={styles.activityImage} />
                        <Text style={styles.activityText}>Biceps</Text>
                    </View>
                    <View style={styles.activity}>
                        <Image source={require('C:/Users/crist/fitlendar/fitlendarFrontend/Frontend/assets/gym2.jpeg')} style={styles.activityImage} />
                        <Text style={styles.activityText}>Running</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#1C1C1E', // Negro premium de Apple
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: wp(5),
    },
    avatar: {
        width: hp(10), // Ajusta el tamaño según sea necesario
        height: hp(10), // Ajusta el tamaño según sea necesario
        borderRadius: hp(5), // La mitad del ancho y alto para hacerla circular
        borderWidth: 4,
        borderColor: '#FFFFFF',
        marginLeft: wp(5),
    },
    textContainer: {
        marginVertical: hp(4),
    },
    text: {
        fontSize: hp(4),
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    textNeutral: {
        color: '#FFFFFF', // Color blanco para visibilidad en fondo negro
    },
    textRose: {
        color: '#FF3B30', // Color rojo de Apple
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        margin: wp(5),
    },
    statBox: {
        width: wp(40),
        height: hp(10),
        borderWidth: 1,
        borderColor: '#2C2C2E',
        backgroundColor: '#2C2C2E',
        borderRadius: 17,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: hp(1),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.9,
        shadowRadius: 4,
        elevation: 5,
    },
    statText: {
        color: '#A0A0A0',
        fontSize: hp(2),
    },
    statValue: {
        color: '#FFFFFF',
        fontSize: hp(2.5),
        fontWeight: 'bold',
    },
    activitiesContainer: {
        marginTop: hp(4),
        marginHorizontal: wp(5),
    },
    activitiesTitle: {
        color: '#FFFFFF',
        fontSize: hp(3),
        fontWeight: 'bold',
        marginBottom: hp(3),
    },
    activityRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    activity: {
        alignItems: 'center',
    },
    activityImage: {
        width: wp(20),
        height: wp(20),
        borderRadius: wp(10),
        marginBottom: hp(1),
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    activityText: {
        color: '#A0A0A0',
        fontSize: hp(2),
    },
});
