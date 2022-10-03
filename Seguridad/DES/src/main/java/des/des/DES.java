/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package des.des;

/**
 *
 * @author alumno
 * 
 * vamos a cifrar des del siguiente modo:
 * 
 * Modo de bloques de 64 bits 
 * Manejar una llave privada de 64 bits 
 * Vamos a inicilizar la llave privada a 56 bits
 * 
 * Las permutaciones y las cajas de sustitucion se van 
 * a crear desde la instancia del algoritmo de cifrado
 * para ello vamos a ocupar las librerias de crypto y
 * security
 */

import java.security.*;

//para generar las llaves
import javax.crypto.spec.*;

import javax.crypto.*;

import java.io.*;


public class DES {
    
    public static void main(String[] args) throws Exception{
        //vamos a cargar un archivo que vamos a cifrar
        if(args.length != 1){
            //no hay archivo
            mensajeAyuda();
            System.exit(1);
        }
        
        /*
        Lo primero que tenemos que haer es cargar una instancia
        del proveedor del algoritmo del tipo de cifrado por parte
        de las librerias
        */
        
        System.out.println("1.- Generar la clave DES");
        
        //para las llaves ocupamos spec KeyGenerator
        KeyGenerator generadorDES = KeyGenerator.getInstance("DES");
        
        //inicilizamos el tamño de la llave privada
        generadorDES.init(56);
        
        //Vamos a generar las subclaves
        SecretKey clave = generadorDES.generateKey();
        //se generan las 16 subclaves
        
        System.out.println("La clave es: " + clave);
        
        //No tiene formato, se tiene que codificar
        mostrarBytes(clave.getEncoded());
        
        System.out.println("");
        
        /*
        El cifrado des debe de venir acompañado de uno o varios
        estandares de criptografia tales como los vimos en la sesion
        de PKCS
        
        Una instancia DES despues la configuracion de el tipo 
        de cifrado si es bloque o flujo, asi como tambien
        si se aplica o no relleno
        
        ALGORITMO DES
        MODO ECB (ELECTRONIC CODE BOOK)
        PKCS5 RELLENO
        */
        
        Cipher cifrador = Cipher.getInstance("DES/ECB/PKCS5Padding");
        
        System.out.println("2.- Cifrar con DES el archivo : " 
                + args[0]+" , dejar el resultado en: " 
                + args[0] +".cifrado");
        
        //cifrado
        cifrador.init(Cipher.ENCRYPT_MODE, clave);
        
        //el problema es la lectura de los bloques
        //es la entrada o salida del buffer del archivo
        
        byte[] buffer = new byte[1000];
        byte[] bufferCifrado;
        
        //generar los archivos
        FileInputStream in = new FileInputStream(args[0]);
        FileOutputStream out = new FileOutputStream(args[0]+".cifrado");
        
        //lectura
        int bytesleidos = in.read(buffer, 0, 1000);
        while(bytesleidos != -1){
            //pasar al texto claro a cifrado
            bufferCifrado = cifrador.update(buffer, 0, bytesleidos);
            //generamos la salida
            out.write(bufferCifrado);
            bytesleidos = in.read(buffer, 0, 1000);
        }
        //vamos a reunir los pedazos
        bufferCifrado = cifrador.doFinal();
        //ya escribo la salida 
        out.write(bufferCifrado);
        
        in.close();
        out.close();
        
        //descifrar
        System.out.println("3.- Descifrar con DES el archivo :"
        + args[0]+".cifrado" + " , vamos a ver el resultado en el "
        + "archivo :" + args[0]+".descifrado");
        
        //empezamos con el modo de descifrado
        cifrador.init(Cipher.DECRYPT_MODE, clave);
        
        //el buffer de la entrada y salida debe de ser en bytes
        
        byte[] bufferPlano;
        
        in = new FileInputStream(args[0]+".cifrado");
        out = new FileOutputStream(args[0]+".descifrado");
        
        //damos lectura de cada elemento
        bytesleidos = in.read(buffer, 0, 1000);
        //mientras no este al final del archivo que siga leyendo
        while(bytesleidos != -1){
            //pasamos el texto plano a descifrar
            bufferPlano = cifrador.update(buffer, 0, bytesleidos);
            //generamos la salida
            out.write(bufferPlano);
            bytesleidos = in.read(buffer, 0, 1000);
        }
        //reuno los bloques
        bufferPlano = cifrador.doFinal();
        
        in.close();
        out.close();
                 
    }

    private static void mensajeAyuda() {
        System.out.println("Este es un ejemplo para poder cifrar "
                + "archivos de texto con el algoritmo DES");
        System.out.println("Cuidado con la llave solo puede ser de"
                + "8 caracteres");
        System.out.println("Compruebe que esta cargado un archivo"
                + "como argumento");
        System.out.println("ñam ñam ñam ñam n_n/");
    }

    private static void mostrarBytes(byte[] buffer) {
        System.out.write(buffer, 0, buffer.length);
    }
    
}
