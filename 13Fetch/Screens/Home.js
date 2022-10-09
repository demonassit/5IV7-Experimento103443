
import {Button, Text, View} from 'react-native';

//una funcion para nuestra pantalla principal 
//un boton para redireccionarte a un perfil

const Home = ({navigation}) => {
    return 
    <View>
        <Text>
            Pantalla Principal
        </Text>
        <Button 
            title="Ir al Perfil"
            onPress={
                /** para ir a una pantalla necesitamos hacer uso de navigate, cuyo primer argumento es el nombre de la pantalla, y despues un objeto que usaremos para pasar parametros adicionales, en este caso, el nombre del perfil, este ejemplo es bonito :3
        
        */
       () => navigation.navigate('Profile', {name: 'Juanito'})
       }
        >

        </Button>
    </View>
}

export default Home;