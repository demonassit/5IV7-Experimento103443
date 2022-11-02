/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rsamanita;

/**
 *
 * @author alumno
 */

import java.math.BigInteger;
import java.util.*;
import java.io.*;



public class RSAManita {
    
    //para mis numeros grandotes
    int tamprimo;
    BigInteger p, q, n;
    BigInteger fi;
    BigInteger e, d;
    
    //constructor
    public RSAManita(int tamprimo){
        this.tamprimo = tamprimo;
        
    }
    
    //metodo para generar los numeros primos
    public void generarPrimos(){
        // es un numero primo
        p = new BigInteger(tamprimo, 10, new Random());
        //debe de ser otro
        do q = new BigInteger(tamprimo, 10, new Random());
            while(q.compareTo(p)==0);
    }
    
    //generar la clave
    public void generarClave(){
        // n = p*q
        //fi = (p-1)*(q-1)
        n = p.multiply(q);
        fi = p.subtract(BigInteger.valueOf(1));
        fi = fi.multiply((q.subtract(BigInteger.valueOf(1))));
        
        /*
        calcular e y d
        
        e debe de ser un coprimo tal que 1 < e < fi(n)
        */
        
        do e = new BigInteger(2*tamprimo, new Random());
            while((e.compareTo(fi) != -1) 
                || (e.gcd(fi).compareTo(
                        BigInteger.valueOf(1)) !=0));
        
        //d es el inverso multiplicativo de e
        //d = e ^ 1 mod fi
        d = e.modInverse(fi);
    }
    
    public BigInteger[] cifrar(String mensaje){
        
        int i;
        byte[] temp = new byte[1];
        byte[] digitos = mensaje.getBytes();
        
        BigInteger[] bigdigitos = 
                new BigInteger[digitos.length];
        
        //recorremos ese arreglo
        for(i = 0; i < bigdigitos.length; i++){
            temp[0] = digitos[i];
            bigdigitos[i] = new BigInteger(temp);
        }
        
        //viene el cifrado
        BigInteger[] cifrado = 
                new BigInteger[bigdigitos.length];
        
        //aplico la formula  c = M ^ e * mod n
        for(i = 0; i < bigdigitos.length; i++){
            cifrado[i] = bigdigitos[i].modPow(e, n);
        }
        
        return cifrado;
    }
    
    
    public String descifrar(BigInteger[] cifrado){
        
        int j;
        BigInteger[] descifrado = 
                new BigInteger[cifrado.length];
        
        //aplico la formula Md = C ^ d * mod n
        
        
        for(j = 0; j < descifrado.length; j++){
            descifrado[j] = cifrado[j].modPow(d, n);
        }
        
        //formato
        char[] charArray = new char[descifrado.length];
        
        //genero mi cadena de char
        
        
        for(j = 0; j < charArray.length; j++){
            charArray[j] = (char)(descifrado[j].intValue());
        }
        
        return (new String(charArray));
    }
    

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
         /*
    Wiiiiiiiiiiiiii listo
    
    Asi que mi venganza wiiiiiiiiiiiiiiiii *w* n_n
    
    Tarea
    
    Opcion 1:
   
    Realizar este programa de calculo de RSA  
        con una hermosa
    ventana en swing usando metodos privados 
        (1 persona) max 3 digitos los primos
   
   
    Opcion 2:
   
    Realizar este mismo algoritmo con un JSP 
        y un servicio web en el cual
    se tiene un formulario y se agregan los 
        correspondientes elementos
    [con request y response] se hacen las 
        operaciones [1 persona] maximo 3 digitos
   
   
   
    Opcion 3:
    Realizar un cliente y un servidor
   
    Cliente calcula sus numeros p y q n fi
    Servidor calcula sus numeros p q n fi
   
    El equipo se pone de acuerdo para saber quien cifra y quien descifra los mensjaes
    de numeros en un chat
   
    2 personas maximo 3 digitos
    
    
    */
    }
    
}
