import { Text, View, Image } from 'react-native';
import { StyleSheet } from 'react-native';

export default function ExerciseCard(){
    return (
        <View style={styles.card}>
            <Image
                source={{ uri: 'https://placehold.co/100' }}
                style = {styles.image_ejercicio}
            />
            <Text style={styles.title}>Card</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 120,
        width: '80%',
        borderRadius: 8,
        borderColor: '#000',
        borderWidth: 1,
        backgroundColor: '#fff',
        margin: 10,
    },
    image_ejercicio: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginBottom: 10,
    },
    title: {
        color: '#000',
    }
})