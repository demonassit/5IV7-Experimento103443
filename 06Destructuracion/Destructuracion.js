/**
 * Ejemplo de destructuracion
 */

//tenemos el siguiente arreglo
const arregloOrdenadoMayoraMenor = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
console.log(`arregloOrdenadoMayoraMenor: ${arregloOrdenadoMayoraMenor}`)

//supongamos que usara varias veces la primera 
//posicion que consiste en el valor mas
//grande del arreglo es conveniente destructurarlo para
//para tener un nombre mas significativo

const [valorMasGrande] = arregloOrdenadoMayoraMenor;
console.log(`valorMasGrande: ${valorMasGrande}`);

//Podemos obtener tantas variables como deseemos 
//con el patron rest que indica ...nombredelavariable podemos asignar el resto de los valores
const [valorMasGrande1, valorMasGrande2, valorMasGrande3,  ...restoDeValores] = arregloOrdenadoMayoraMenor;
console.log(`valorMasGrande1, valorMasGrande2, valorMasGrande3,  ...restoDeValores: ${valorMasGrande}, ${valorMasGrande2}, ${valorMasGrande3}, ${restoDeValores},`);