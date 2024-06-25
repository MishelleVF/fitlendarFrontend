import { Text, View } from 'react-native';
import { profileStyle } from '../estilos/estilos';
import ExerciseCard from '../components/exeriseCard';

export default function Profile(){
    return (
        <View style={ profileStyle.view }>
            <ExerciseCard
                 
                title="Texto de ejercicio largo"
                descripcion="hhh"
                peso="kkk"
                dificultad="a;sdlkfj000"
            />
        </View>
    )
}