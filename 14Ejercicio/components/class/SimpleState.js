

import { StyleSheet, Text, TextInput, View } from "react-native";
import { Component } from "react";

/*
Vamos a crear los mismo componentes pero ahora de tipo clase, en lugar de funciones

*/ 

export default class SimpleState extends Component{
    //creamos el constructor de la clase
    constructor(props){
        //mandamos a llamar a papa
        super(props);
        /** Esto de aqui es un estado, NO PODEMOS SIMPLEMENTE ASINGARLO, forzosamente tenemos que usar el setter, llamado siempre setState, el valor inicial se coloca en el constructor de la clase, es importante que este sea del mismo tipo todo el tiempo, es decir, que siempre sea una cadena,  un numero, un objeto, o un array, pero no cambiar de un array a una cadena por ejemplo
         * En un class component, asi se usan los estados, o mas bien, el estado ya que solo existe uno
         */
        this.state = {text: ""};


    }

    //lo pintamos wiiiiii
    render(){

        return(
            <>
            <View style= {{margin:50}} >
                <Text>Inversor de Texto</Text>
                <TextInput style={{height:40}} 
                    placeholder = "Escribe aqui"
                    onChangeText = {
                        newText => this.setState({text:newText})
                    }
                    defaultValue = {this.state.text}
                >
                    
                </TextInput>

            </View>
            
                    
            <View>
                <Text style={{padding: 10, fontSize: 42}}>
                    {Array.from(this.state.text).reverse().join('')}
                </Text>
            </View>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#fff',
        alignItems : 'center',
        justifyContent : 'center'
    },
});