import { Text, View } from 'react-native';
import { exercisesStyle } from '../estilos/estilos'


export default function Exercises(){
    return (
        <View style={ exercisesStyle.view }>
            <Text style={ exercisesStyle.text }>Ejercicios</Text>
        </View>
    )
}