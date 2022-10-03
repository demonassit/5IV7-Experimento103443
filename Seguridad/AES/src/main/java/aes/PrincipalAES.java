/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package aes;

/**
 *
 * @author alumno
 */
public class PrincipalAES {
    
    public static void main(String[] args) throws Exception{
        String mensaje = "habia una vez un patito que decia"
                + "miau miau, y queria mimir todo el dia, pero le"
                + "dejaban mucha tarea y queria matar a un alumno en"
                + "particular, asi que empezo a planear unas cosas"
                + "asi bien locas, para dejarles mas trabajo a los alumnos"
                + "hasta que ese alumno se petatee de las tareas"
                + "y diga miau miau el patito y pueda mimir";
        
        String mensajecifrado = AES.cifrar(mensaje);
        String mensajedescifrado = AES.descifrar(mensajecifrado);
        
        System.out.println("El mensaje original: "+ mensaje);
        System.out.println("El mensaje cifrado es: " + mensajecifrado);
        System.out.println("El mensaje descifrado es: " + mensajedescifrado);
    }
    
}
