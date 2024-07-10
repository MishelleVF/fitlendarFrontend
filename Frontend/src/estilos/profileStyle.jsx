// ProfileStyles.js
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
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
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    profiletext: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#B71C1C',
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
