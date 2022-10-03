/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package aes;

import java.security.*;

import javax.crypto.*;
//vamos a ocupar la clase SecretKeySpec para la generacion
//de subllaves para aes
import javax.crypto.spec.SecretKeySpec;

import sun.misc.*;
/**
 *
 * @author alumno
 */
public class AES {
    
    //vamos a obtener la llave
    public static final byte[] nuestrallave = new byte[]{
        /*
        La llave puede ser de 
        128 -> 16 caracteres 9 rondas
        192 -> 24 caracteres 11 rondas
        256 -> 32 caracteres 13 rondas
        
        */
        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i',
        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i',
        'q', 'w', 'e', 'r', 't', 'y', 'u', 'i'
    };
    
    private static final String instancia = "AES";
    
    //vamos  a crear un metodo para cifrar
    public static String cifrar(String Data) throws Exception{
        /*para poder cifrar debemos de generar las llaves 
        pero vamos a crear un metodo para dicha generacion
        */
        //ocupamos Key
        Key key = generateKey();
        
        //inicializamos el cifrado
        Cipher cifrado = Cipher.getInstance(instancia);
        
        cifrado.init(Cipher.ENCRYPT_MODE, key);
        
        //vamos a obtener el mensaje y transformarlo
        byte[] encValores = cifrado.doFinal(Data.getBytes());
        
        //vamos aplicar un formato para que pueda ser leido 
        //el mensaje, por ello ocupamos el estandar BASE64
        System.out.println("Valores sin formato: " + encValores);
        
        String valoresencriptados = 
                new BASE64Encoder().encode(encValores);
        
        System.out.println("Valores con formato: " 
                + valoresencriptados);
        
        return valoresencriptados;
         
    }
    
    public static String descifrar(String valoresencriptados) throws Exception{
        /*para poder cifrar debemos de generar las llaves 
        pero vamos a crear un metodo para dicha generacion
        */
        //ocupamos Key
        Key key = generateKey();
        
        //inicializamos el cifrado
        Cipher cifrado = Cipher.getInstance(instancia);
        
        cifrado.init(Cipher.DECRYPT_MODE, key);
        
        //vamos a obtener u formato del mensaje
        byte[] decodificadorvalores = 
                new BASE64Decoder().decodeBuffer(valoresencriptados);
        
        //vamos aplicar un formato para que pueda ser leido 
        //el mensaje, por ello ocupamos el estandar BASE64
        System.out.println("Valores sin formato: " + decodificadorvalores);
        
        //la transformacion del mensaje
        byte[] decValores = cifrado.doFinal(decodificadorvalores);
        
        System.out.println("Valores con formato: " 
                + decValores);
        
        String valoresdescifrados = new String(decValores);
        
        return valoresdescifrados;
         
    }

    private static Key generateKey() {
        /*
        vamos a ocupar las llaves de aes de la clase
        SecretKeySpec
        */
        Key key = new SecretKeySpec(nuestrallave, instancia);
        return key;
    }
    
}
