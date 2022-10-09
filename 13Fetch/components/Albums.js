/**
 * 
 * vamos a crear un componente que se encargue de mostar un album
 * musical a traves de 3 elementos:
 * nombre
 * img
 * canciones
 */

import {Image, StyleSheet, Text, View} from "react-native";

const ULRow = ({text}) => (<View
        style = {{flexDirection: 'row'}}
        >
            <Text>💿</Text>
            <Text style={{
                paddingLeft : 5,
                textAlign : "justify",
                color : "#FFF"
            }} >{text}</Text>
        </View>);

const Album = ({name, img, song}) => {
    return <View style={styles.container} >
        <Text style={styles.title} > </Text>
        <Image style={styles.image} source={img} ></Image>
        <View style={styles.section} > 
            <Text style={styles.subtitle} >Songs: </Text>
            {song.map((song) => <ULRow text={song} key={`album-${name}-${song}`} > </ULRow>)}
        </View>  

        </View>
};

const styles = StyleSheet.create({
    title: {
        margin: 'auto',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 20,
        color: "#FFF"
    },
    subtitle: {
        margin: 'auto',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 15
    },
    image: {

        width: 250,
        height: 250
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
        color: "#FFF"
    },
    section: {
        marginTop: 50,
        color: "#FFF",
        width: '90%',
    }
});

export default Album;