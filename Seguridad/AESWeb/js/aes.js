var mensaje = "habia una vez un patito que decia miau miau, y ese patito queria mimir todo el dia, pero en lugar de mimir, tenia que ir a trabajar y y y eso lo hacia sentir mal y por eso comia panditas y y y un dia el patito que decia miau miau se quedo sin panditas T_T";

var password = "qweh";

//proceso bien feo de cifrado

var cifrado = CryptoJS.AES.encrypt(mensaje, password);
var descifrado = CryptoJS.AES.decrypt(cifrado, password);

//fin del proceso tedioso wiiiii

//imprimir
document.getElementById("demo00").innerHTML = mensaje;
document.getElementById("demo01").innerHTML = cifrado;
document.getElementById("demo02").innerHTML = descifrado;
document.getElementById("demo03").innerHTML = descifrado.toString(CryptoJS.enc.Utf8);