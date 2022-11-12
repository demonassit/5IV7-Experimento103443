/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rsalib;

/**
 *
 * @author alumno
 */

import java.io.*;

import java.security.*;

import javax.crypto.*;

import org.bouncycastle.jce.provider.BouncyCastleProvider;

/*
La libreria BC nos sirve para el calculo de los numero de 
p q d e n fi pero aun mas grandotes, para la generacion de 
llaves publicas y privadas aun mas seguras, pero su desventaja
viene a partir del ECB el modo a bloques del algorito, 
significa que el tamaño min de la llave es de 512 y 
la lectura del bloque debe de realizarce a mano
*/

public class RSALib {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws Exception{
        // TODO code application logic here
        //Lo primero que tenemos que hacer es añadir el proveedor
        //del algoritmo debido a que security no tiene soporte 
        Security.addProvider(new BouncyCastleProvider());
        
        //vamos a generar las claves
        System.out.println("1.- Crear las llaves publica y privada");
        
        //la clase KeyPairGenetator para la generacion de llaves
        KeyPairGenerator keygen = KeyPairGenerator.getInstance("RSA", "BC");
        
        //inicializamos la llave
        keygen.initialize(4096);
        
        //asignamos las llaves publica y privada
        KeyPair clavesRSA = keygen.generateKeyPair();
        
        //definimos clave publica y privada
        PublicKey clavePublica = clavesRSA.getPublic();
        PrivateKey clavePrivada = clavesRSA.getPrivate();
        
        System.out.println("2.- introducri el texto plano a cifrar (maximo 64 caracteres)");
        
        //almacenamos el texto en un arreglo de bytes
        byte[] bufferplano = leerLinea(System.in);
        
        //ciframos
        Cipher cifrado = Cipher.getInstance("RSA", "BC");
        
        //Ciframos con publica
        cifrado.init(Cipher.ENCRYPT_MODE, clavePublica);
        
        System.out.println("3.- Ciframos con clave publica: ");
        
        byte[] buffercifrado = cifrado.doFinal(bufferplano);
        
        System.out.println("Texto cifrado: ");
        
        mostrarBytes(buffercifrado);
        
        System.out.println("");
        
        //desciframos con privada
        
        cifrado.init(Cipher.DECRYPT_MODE, clavePrivada);
        
        System.out.println("4.- Desciframos con la clave privada: ");
        
        byte[] bufferdescifrado = cifrado.doFinal(buffercifrado);
        
        mostrarBytes(bufferdescifrado);
        
        System.out.println("");
        
        //alrevez
        
        cifrado.init(Cipher.ENCRYPT_MODE, clavePrivada);
        
        System.out.println("5.- Ciframos con clave privada");
        
        buffercifrado = cifrado.doFinal(bufferplano);
        
        System.out.println("Texto Cifrado: ");
        
        mostrarBytes(buffercifrado);
        
        System.out.println("");
        
        cifrado.init(Cipher.DECRYPT_MODE, clavePublica);
        
        System.out.println("6.- Desciframos con clave publica");
        
        bufferdescifrado = cifrado.doFinal(buffercifrado);
        
        System.out.println("Texto Descifrado: ");
        
        mostrarBytes(bufferdescifrado);
        
        System.out.println("");
        
        
        
    }

    private static byte[] leerLinea(InputStream in) throws IOException {
        //definimos la lectura del bloque
        byte[] buffer1 = new byte[1000];
        
        int i = 0;
        
        byte c;
        
        c = (byte)in.read();
        
        while((c != '\n') && (i < 1000)){
            buffer1[i] = c;
            c = (byte)in.read();
            i++;
        }
        
        byte[] buffer2 = new byte[i];
        
        for(int j = 0; j < i; j++){
            buffer2[j] = buffer1[j];
        }
        
        return buffer2;
    }

    private static void mostrarBytes(byte[] buffer) {
        System.out.write(buffer, 0, buffer.length);
    }
    
}
