// ExerciseCardStyles.js
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
