import { Text, View } from 'react-native';
import { homeStyle } from '../estilos/estilos'


export default function Home(){
    return (
        <View style={ homeStyle.view }>
            <Text style={ homeStyle.text }>Calendario</Text>
        </View>
    )
}