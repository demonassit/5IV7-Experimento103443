
import {Text} from "react-native";

const BitcoinDataComponent = ({rate, date}) =>{
    return <>
        <Text>
            Tasa de cambio del bitcoin(USD) : {rate}
        </Text>
        <Text>
            Fecha de consulta: {date}
        </Text>
    </>;
}

export default BitcoinDataComponent