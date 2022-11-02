/**
 * npx create-expo-app ejemplootroreact
 * npm start
 * npx expo install react-native-web@~0.18.7 react-dom@18.0.0 @expo/webpack-config@^0.17.0
 */

import BitcoinData from "./pages/BitcoinData";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "./pages/Home";

const Stack = createNativeStackNavigator();

export default function App(){
    return (
        <NavigationContainer initialRouteName="Home" >
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} ></Stack.Screen>
                <Stack.Screen name="Bitcoin" component={BitcoinData} ></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}