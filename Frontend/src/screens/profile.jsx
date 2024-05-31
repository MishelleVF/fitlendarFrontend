import { Text, View } from 'react-native';
import { profileStyle } from '../estilos/estilos'



export default function Profile(){
    return (
        <View style={ profileStyle.view }>
            <Text style={ profileStyle.text }>Perfil</Text>
        </View>
    )
}