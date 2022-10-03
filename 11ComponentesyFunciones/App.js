/**
 * npx create-expo-app ejemplootroreact
 * npm start
 * npx expo install react-native-web@~0.18.7 react-dom@18.0.0 @expo/webpack-config@^0.17.0
 */

 import {ScrollView, StyleSheet} from 'react-native';
 import SimpleState from "./components/functional/SimpleState";
 
 export default function App() {
     return (
         <ScrollView>
             <SimpleState/>
         </ScrollView>
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