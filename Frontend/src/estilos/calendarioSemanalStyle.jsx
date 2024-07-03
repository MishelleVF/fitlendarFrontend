// CalendarioSemanalStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#000',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    calendar: {
        flexDirection: 'row',
    },
    dayColumn: {
        flex: 1,
        margin: 5,
    },
    dayHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        marginBottom: 5,
    },
    hourBlock: {
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#fff',
        padding: 10,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedHourBlock: {
        backgroundColor: '#BBF247',
    },
    confirmButton: {
        padding: 15,
        backgroundColor: '#BBF247',
        borderRadius: 5,
        alignItems: 'center',
        margin: 10,
    },
    confirmButtonText: {
        color: '#000',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    modalHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    modalSubHeader: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    exerciseItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    closeButton: {
        padding: 10,
        backgroundColor: '#f00',
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    selectedExercises: {
        marginTop: 20,
    },
    finishButton: {
        padding: 15,
        backgroundColor: '#BBF247',
        borderRadius: 5,
        alignItems: 'center',
        margin: 10,
    },
    finishButtonText: {
        color: '#000',
        fontWeight: 'bold',
    },
    card_ejercicio_a: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        margin: 5,
    },
    info_ejercicio_a: {
        padding: 10,
    },
    title_ejercicio_a: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description_ejercicio_a: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    detail_ejercicio_a: {
        fontSize: 14,
        marginBottom: 5,
    },
});
