/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package exportarllaves2;

/**
 *
 * @author alumno
 */

import java.security.*;
import javax.crypto.*;
import java.io.*;
import java.security.spec.KeySpec;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;

public class Exportarllaves2 {

    /**
     * @param args the command line arguments
     */
    private static Cipher rsa;
    
    public static void main(String[] args) throws Exception{
        // TODO code application logic here
        KeyPairGenerator generadorRSA = KeyPairGenerator.getInstance("RSA");
        
        KeyPair llavesRSA = generadorRSA.generateKeyPair();
        
        PublicKey llavePublica = llavesRSA.getPublic();
        
        PrivateKey llavePrivada = llavesRSA.getPrivate();
        
        //metodo para guardar y cargar llaves
        save(llavePublica, "publickey.key");
        
        llavePublica = loadPublicKey("publickey.key");
        
        save(llavePrivada, "privatekey.key");
        
        llavePrivada = loadPrivateKey("privatekey.key");
        
        rsa = Cipher.getInstance("RSA/ECB/PKCS1Padding");
        
        String texto = "Hola habia una vez un patito que decia miau miau, y ya era viernes y queria ir a mimir; pero aun habia mucho trabajo y tenia que reprobar gente y queria mimri mucho, pero les hiba a dejar de una vez un examen bien feo foe foe para desquitarse de que no obtuvo un god of war ragnarock edicion de coleccion y asi poder mimir en paz y tranquilito wiiiiii";
        
        //ciframos
        rsa.init(Cipher.ENCRYPT_MODE, llavePublica);
        
        byte[] encriptado = rsa.doFinal(texto.getBytes());
        
        //vamos a hacerlo visible
        for(byte b : encriptado){
            System.out.print(Integer.toHexString(0xFF & b));
        }
        
        System.out.println("");
        
        rsa.init(Cipher.DECRYPT_MODE, llavePrivada);
        
        System.out.println("");
        
        byte[] bytesdescifrados = rsa.doFinal();
        String textodescifrado = new String(bytesdescifrados);
        System.out.println(textodescifrado);
        
    }

    private static void save(Key key, String archivo) throws Exception{
        byte[] llavesbytes = key.getEncoded();
        FileOutputStream fos = new FileOutputStream(archivo);
        fos.write(llavesbytes);
        fos.close();
    }

    private static PublicKey loadPublicKey(String archivo) throws  Exception{
        FileInputStream fis = new FileInputStream(archivo);
        int numBytes = fis.available();
        byte[] bytes = new byte[numBytes];
        fis.read();
        fis.close();
        
        //aplicamos el formato
        KeyFactory llaveBytesPublico = KeyFactory.getInstance("RSA");
        KeySpec keyspec = new X509EncodedKeySpec(bytes);
        PublicKey nuevallavepublica = 
                llaveBytesPublico.generatePublic(keyspec);
        return nuevallavepublica;
    }

    private static PrivateKey loadPrivateKey(String archivo) throws Exception{
        FileInputStream fis = new FileInputStream(archivo);
        int numBytes = fis.available();
        byte[] bytes = new byte[numBytes];
        fis.read();
        fis.close();
        
        //aplicamos el formato
        KeyFactory llaveBytesPrivado = KeyFactory.getInstance("RSA");
        KeySpec keyspec = new PKCS8EncodedKeySpec(bytes);
        PrivateKey nuevallaveprivada = 
                llaveBytesPrivado.generatePrivate(keyspec);
        return nuevallaveprivada;
    }
    
}
