import {Button, Text, View} from 'react-native';

const Profile = ({navigation, route}) =>{
    /**Aqui recuperamo el valor del parametro que enviamos desde el boton que esta en Home.js */
    return 
        <View>
            <Text>
                Bienvenido a tu perfil: {route.params.name}
            </Text>
            <Button
                title='Ir a la pantalla Inicial'
                onPress={
                    () => navigation.navigate('Home')
                }
            >

            </Button>
        </View>
}

export default Profile;