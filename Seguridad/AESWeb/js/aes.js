var mensaje = "habia una vez un patito que decia miau miau, y ese patito empezo a caminar y decia miau miau miau, y un dia se encontro con un gatito que decia cuack cuak, cuando se vieron vieron sus ojotes y se acerco el patito al gatito y le acaricio su rostro y se repego para abrazar al gatito, y el gatito que decia cuack cuack tambien se repego al patito y desde ese dia el patito y el gatito caminaban juntos diciendo miau miau y cuack cuack, para que asi el gatito dijera miau y el patito cuak porque al fin se complementaban";

var password = "patito";

//proceso bien feo de cifrado

var cifrado = CryptoJS.AES.encrypt(mensaje, password);
var descifrado = CryptoJS.AES.decrypt(cifrado, password);

//fin del proceso tedioso wiiiii

//imprimir
document.getElementById("demo00").innerHTML = mensaje;
document.getElementById("demo01").innerHTML = cifrado;
document.getElementById("demo02").innerHTML = descifrado;
document.getElementById("demo03").innerHTML = descifrado.toString(CryptoJS.enc.Utf8);