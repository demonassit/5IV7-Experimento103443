/**
 * npx create-expo-app ejemplootroreact
 * npm start
 * npx expo install react-native-web@~0.18.7 react-dom@18.0.0 @expo/webpack-config@^0.17.0
 */

 import {StyleSheet} from 'react-native';
 import {NavigationContainer} from "@react-navigation/native";
 import {createNativeStackNavigator} from '@react-navigation/native-stack';

//nuestras ventanas
import Profile from "./Screens/Profile";
import Home from "./Screens/Home";


//import SimpleState from "./components/functional/SimpleState";
// import ComplexStates from "./components/functional/ComplexStates";
 
 export default function App() {
    
    const Stack = createNativeStackNavigator();
    
    return (
        /*
         <ScrollView>
             <ComplexStates/>
         </ScrollView>
         Este objeto tiene como componentes Navigator y Screen, los cuales crean un contexto que permite desplazarse a traves de las pantallas, tienens que respetar la estructura 
         (NavigationContainer > Stack. Navigator > Stack.Screen)
         Tienen varias propiedades como mostrar u ocultar el boton de volver.
     */
        <NavigationContainer>{}
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component = {Home}
                    options = {{title:'Welcome'}}
                >

                </Stack.Screen>
                <Stack.Screen
                    name = "Profile"
                    component = {Profile}
                >

                </Stack.Screen>
            </Stack.Navigator>
           
        </NavigationContainer>
         );


 }
 
 const styles = StyleSheet.create({
     container: {
         flex: 1,
         backgroundColor: '#fff',
         alignItems: 'center',
         justifyContent: 'center',
     },
 });