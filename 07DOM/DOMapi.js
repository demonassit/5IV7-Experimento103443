/*
vamos a crear un carrusel de imagen que se consume 
por medio de una api
*/ 

window.onload = () =>{

    //las imagenes
    const imagenes = [
        "https://w.wallhaven.cc/full/l3/wallhaven-l315vy.png",
        "https://w.wallhaven.cc/full/j3/wallhaven-j3gz1w.jpg",
        "https://w.wallhaven.cc/full/72/wallhaven-725mg9.png",
        "https://w.wallhaven.cc/full/rd/wallhaven-rd83mq.jpg"
    ];

    /**
     * con la api de dom podemos acceder al documento HTML
     * para esto necesitamos buscar, estos nodos de alguna manera
     * a partir de los id 
     * Podemos buscar a los elementos de diferentes formas
     * por id, por nombre, por clases, por etiquetas
     * 
     * de estos atributos solo la busqueda por ID nos devolvera
     * un unico elmento, los demas devolveran una
     * lista de nodos la cual no debe de confundirse con un arreglo, 
     * observe como podemos obtener los botones
     */

    const display = document.getElementById("display");
    const botones = Array.from(document.getElementsByName("boton"));
    const campoMensaje = document.getElementById("mensaje");
    const mensajes = document.getElementById("mensajes");
    const colorValor = document.getElementById("colorValor");

    let imagenActual = 0;

    const imagenAnterior = () =>{
        //accedemos a la imgen dentro del arreglo
        //con su indice, cuando es la ultima
        //regresamos a la primera
        if(imagenActual > 0){
            imagenActual--;
        }else{
            imagenActual = imagenes.length-1;
        }
        display.src = imagenes[imagenActual];
    };

    const imagenSiguiente = () =>{
        //accedemos a la imgen dentro del arreglo
        //con su indice, cuando es la ultima
        //regresamos a la primera
        if(imagenActual < imagenes.length -1){
            imagenActual++;
        }else{
            imagenActual = 0;
        }
        display.src = imagenes[imagenActual];
    };

    const pantallaCompleta = () =>{
        /**
         * otra forma para cuando se solicita la pantalla completa nos devuelva una promesa por si queremos manejar el elemento de 
         * pantalla completa
         */
        display.requestFullscreen();

    };

    const mostrarMensaje = () => {
        /**
         * otra de las cosas que se puede hacer es
         * modificar el html interno de un elemento
         * para agregar de forma dinamica nuevos elementos
         */

        mensajes.innerHTML += `${campoMensaje.value}<br/>`;
        campoMensaje.value = "";
        /**
         * si queremos manipular los elementos recien creados
         * createElement 
         * const lista = document.createElement("ul");
         * const elementoLista = document.createElement("li");
         * elementoLista.onclick = pantallaCompleta;
         * elementoLista.innetHTML = `${campoMensaje.value}`;
         * lista.append(elementoLista);
         * mensajes.append(lista);
         */
    };

    const cambiarColor = () =>{
        //en lugar usar el typecolor usamos 
        //un boton con un icono
        colorValor.click();
    };

    const inicializar = () =>{
        //vamos a ver los botones
        botones.find(boton => boton.id === "siguiente").onclick = imagenSiguiente;
        botones.find(boton => boton.id === "anterior").onclick = imagenAnterior;
        botones.find(boton => boton.id === "pantallaCompleta").onclick = pantallaCompleta;
        botones.find(boton => boton.id === "mostrarMensaje").onclick = mostrarMensaje;
        botones.find(boton => boton.id === "cambiarColor").onclick = cambiarColor;

        //en general podemos manipular cualquier atributo
        colorValor.onchange = () =>{
            mensajes.style.color = colorValor.value;
        };

        display.src = imagenes[0];

    };

    inicializar();

};