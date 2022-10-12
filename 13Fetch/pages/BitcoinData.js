

import {Button, Text, View} from "react-native";
import { useEffect, useState} from "react";
import BitcoinDataComponent from "../components/bitcoin/BitcoinDataComponent";

const BitcoinData = () => {
    const [bitcoinData, setBitcoinData] = useState({
        rate: "",
        date: "",
        fetched: false,
        error: false,
        refresh: false
    });
    /**useEffect se ejecutara al menos una vez que se monta el componente.
     * pero con el fin de que no se realicen peticiones adicionales convene una pequeña validacion.
     * Nota las peticiones suelen hacerse a nivel del componente, 
     */
    useEffect(() => {
        if(!bitcoinData.fetched || bitcoinData.refresh){
            fetch("https://api.coindesk.com/v1/bpi/currentprice.json").then(response => response.json()).then(bitcoinResponse => setBitcoinData({
                rate: bitcoinResponse.bpi.USD.rate,
                date: new DataTransfer(bitcoinResponse.time.updated).toLocalTimeString(), 
                fetched : true,
                refresh: false,
                error: false
            })).catch(() => {
                setBitcoinData({
                    ...bitcoinData,
                    fetched: true,
                    error: true,
                    refresh: false,
                })
            });
        }
        /**
         * En caso de que en lugar de un fetch fuera una conexion en tiempo real, aqui necesitarias cerrar la conexion, tambien como los timeOut de intervalos que se tiene que checar para eliminar. Nota a las fuciones que devuelven y /o reciben otra funcion se les llaman fucniones de orden superior
         */
        return() => {

        }
    }, 
    /**un arreeglo de depencias si el valor de alguno de sus elementos cambia volveria a ejecutar, la funcion del useEffect, por eso es necesario validar dentro para evitar comportaminetos no deseados, sino pones nada en el array, useEffect se ejecutara una sola vez, idealmente, sino pones el array se convierte en un bucle infinito */
    [bitcoinData.refresh]);

    const handleRefresh = () => setBitcoinData({...bitcoinData, refresh: true})

    return <View>
        {!bitcoinData.fetched && <Text>Cargando</Text>}
        {bitcoinData.error && <Text> Ocurrio un error al recuperar la información</Text>}
        <BitcoinDataComponent date={bitcoinData.date} rate={bitcoinData.rate}>
        </BitcoinDataComponent>
        <Button title="refresh" onPress={handleRefresh}  ></Button>
    </View>
}

export default BitcoinData;