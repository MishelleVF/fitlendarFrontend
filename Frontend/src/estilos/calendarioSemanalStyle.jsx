import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
        backgroundColor: '#000',
    },
    calendarContainer: {
        flexDirection: 'row',
        flex: 1,
    },
    daysRow: {
        flexDirection: 'row',
    },
    hourColumnHeader: {
        width: 60,
        backgroundColor: '#f5f5f5',
    },
    dayColumnHeader: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#f5f5f5',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    dayHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#444',
    },
    scrollView: {
        flexDirection: 'row',
    },
    scrollViewContent: {
        flexDirection: 'row',
    },
    hourColumn: {
        width: 60,
        backgroundColor: '#f5f5f5',
    },
    calendar: {
        flexDirection: 'row',
    },
    dayColumn: {
        flex: 1,
        alignItems: 'center',
    },
    hourBlock: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        borderRightWidth: 1,
        borderRightColor: '#ddd',
    },
    selectedHourBlock: {
        backgroundColor: '#4caf50',
        borderColor: '#388e3c',
    },
    hourText: {
        fontSize: 12,
        color: '#000',
    },
    confirmButton: {
        position: 'absolute',
        bottom: 120, // Ajusta este valor para cambiar la altura del botón
        right: 20,
        backgroundColor: '#1a73e8', // Google blue color
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        elevation: 8, // Adds shadow for Android
        shadowColor: '#000', // Adds shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#000'
    },
    modalHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#444',
    },
    modalSubHeader: {
        fontSize: 18,
        marginBottom: 20,
        color: '#666',
    },
    exerciseCard: {
        backgroundColor: '#fafafa',
        padding: 10,
        margin: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    exerciseInfo: {
        marginBottom: 5,
    },
    exerciseTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    exerciseDescription: {
        fontSize: 14,
        color: '#555',
    },
    exerciseDetail: {
        fontSize: 12,
        color: '#888',
    },
    selectedExercises: {
        marginVertical: 20,
    },
    selectedExerciseText: {
        fontSize: 14,
        color: '#333',
    },
    finishButton: {
        backgroundColor: '#4caf50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    finishButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    closeButton: {
        backgroundColor: '#f44336',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default styles;