import { Text, View } from 'react-native';
import { sugestionsStyle } from '../estilos/estilos'


export default function Profile(){
    return (
        <View style={ sugestionsStyle.view }>
            <Text style={ sugestionsStyle.text }>Sugestions</Text>
        </View>
    )
}