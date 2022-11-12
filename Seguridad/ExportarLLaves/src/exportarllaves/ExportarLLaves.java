/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package exportarllaves;

/**
 *
 * @author alumno
 */

import java.io.*;
import java.security.*;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import javax.crypto.*;
import javax.crypto.spec.DESKeySpec;

import org.bouncycastle.jce.provider.BouncyCastleProvider;


public class ExportarLLaves {

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws Exception{
        // TODO code application logic here
        //verificar si existe el archivo}
        if(args.length != 1){
            mensajeAyuda();
            System.exit(1);
        }
        
        //creamos los archivos
        System.out.println("Creamos los archivos" + args[0]+".secreta"
        + args[0]+".privada" + args[0]+".publica");
        
        //añadimos el proveedor
        Security.addProvider(new BouncyCastleProvider());
        
        //generacion de las llaves de rsa
        KeyPairGenerator generadorRSA = 
                KeyPairGenerator.getInstance("RSA", "BC");
        
        //inicializamos la llave
        generadorRSA.initialize(4096);
        
        //generamos las llaves
        KeyPair llavesRSA = generadorRSA.generateKeyPair();
        
        //definimos a privada y publica
        PublicKey clavePublica = llavesRSA.getPublic();
        
        PrivateKey clavePrivada = llavesRSA.getPrivate();
        
        //vamos a generar las llaves para firma
        KeyFactory llavesfirmaRSA = KeyFactory.getInstance("RSA", "BC");
        
        /*
        Tenemos que establecer el protocolo como se vio en clase, por parte
        de la firma deacuerdo al PKCS8
        */
        
        PKCS8EncodedKeySpec pkcs8llave = 
                new PKCS8EncodedKeySpec(clavePrivada.getEncoded());
        
        //vamos a escribir la llave en un archivo
        FileOutputStream archivosalida = 
                new FileOutputStream(args[0]+".privada");
        
        archivosalida.write(pkcs8llave.getEncoded());
        archivosalida.close();
        
        //para recuperar la llave
        byte[] bufferpriv = new byte[5000];
        FileInputStream in =
                new FileInputStream(args[0]+".privada");
        in.read(bufferpriv, 0, 5000);
        in.close();
        
        //recuperamos la clave y comparamos con una guardada para verificar que
        //sea la correcta
        //primero damos formato
        PKCS8EncodedKeySpec clavePrivadaarchivo = 
                new PKCS8EncodedKeySpec(bufferpriv);
        
        //verifico la clave
        PrivateKey clavePrivada2 = 
                llavesfirmaRSA.generatePrivate(clavePrivadaarchivo);
        
        if(clavePrivada.equals(clavePrivada2)){
            System.out.println("Ok, la llave privada si es valida");
        }else{
            System.out.println("Ya te hackiaron");
        }
        
        
        //publica
        X509EncodedKeySpec llavex509 = 
                new X509EncodedKeySpec(clavePublica.getEncoded());
        
        archivosalida = new FileOutputStream(args[0]+".publica");
        //se hace uso del estandar x509 para poder generar la llave
        //publica para los servicios de verificacion del archivo
        archivosalida.write(llavex509.getEncoded());
        archivosalida.close();
        
        //recuperamos el archivo publico
        byte[] bufferpublic = new byte[5000];
        in = new FileInputStream(args[0]+".publica");
        in.read(bufferpublic, 0, 5000);
        in.close();
        
        //recuperamos y validamos
        X509EncodedKeySpec clavePublicafirma = 
                new X509EncodedKeySpec(bufferpublic);
        
        //creamos otra llave para compararla
        PublicKey clavePublica2 = 
                llavesfirmaRSA.generatePublic(clavePublicafirma);
        
        if(clavePublica.equals(clavePublica2)){
            System.out.println("Ok, la llave publica si es valida");
        }else{
            System.out.println("Ya te hackiaron");
        }
        
        //si la damos por defecto
        KeyGenerator generadorDES = KeyGenerator.getInstance("DES");
        
        generadorDES.init(56);
        
        SecretKey claveSecretaDES = generadorDES.generateKey();
        
        SecretKeyFactory llavesDES = SecretKeyFactory.getInstance("DES");
        
        //realizamos el volcado de las llaves
        archivosalida = new FileOutputStream(args[0]+".secreta");
        archivosalida.write(claveSecretaDES.getEncoded());
        archivosalida.close();
        
        //recuperar
        byte[] buffersecret = new byte[5000];
        in = new FileInputStream(args[0]+".secreta");
        in.read(buffersecret, 0, 5000);
        in.close();
        
        //comparo las llaves
        DESKeySpec llavesdes = new DESKeySpec(buffersecret);
        
        SecretKey clavesecreta2 = llavesDES.generateSecret(llavesdes);
        
        if(claveSecretaDES.equals(clavesecreta2)){
            System.out.println("Ok, la llave secreta si es valida");
        }else{
            System.out.println("Ya te hackiaron");
        }
        
        
    }

    private static void mensajeAyuda() {
        System.out.println("Ejemplo de archivos de firma");
    }
    
}
