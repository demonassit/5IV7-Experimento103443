/**
 * Vamos a crear una api rest que nos pemite obtener informaicon sobre diferentes pokemones se puede consiltar desde https://pokeapi.co/
 */

const pokeApiUrl = "https://pokeapi.co/api/v2/";

const pokedex = () =>{
    /**este es un objeto auxiliar que nos permite acceder a los campos destinados a mostrar estadisticas del pokemon a buscar, como pueden ver estamos haciendo uso de la API de DOM que vimos anteriormente*/
    const pokemonStatsElements = {
        hp: document.getElementById("pokemonStatHp"),
        attack: document.getElementById("pokemonStatAttack"),
        defense: document.getElementById("pokemonStatDefense"),
        specialAttack: document.getElementById("pokemonStatSpecialAttack"),
        specialDefense: document.getElementById("pokemonStatSpecialDefense"),
        speed: document.getElementById("pokemonStatSpeed")
    };
    /**Este es una referencia auxiliar que nos permitira utilizar las clases que estan en el archivo de css de acuerdo al tipo de pokemon */
    let currentClassType = null;
    //Este es una sumple cadeno para crear la imagne
    const imageTemplate = "<img class='pokedisplay' src='{imgSrc}' alt='pokedisplay' />";

    /**Este objeto sirve para guardar las rutas de las imagenes de apoyo que se utilizaran cuando esperemos el resultado de la bsuqueda o cuando no se encuentr el pokemon solicitado */

    const images = {
        imgPokemonNotFound: "./img/404.png",
        imgLoading: "./img/loading.gif"
    };

    /**Este objeto contiene las referencias de los elementos que se desplegaran con la informacion del pokemon */

    const container = {
        imageContainer: document.getElementById("pokedisplay-container"),
        pokemonTypesContainer: document.getElementById("pokemonTypes"),
        pokemonNameElement: document.getElementById("pokemonNameResult"),
        pokemonAbilitiesElement: document.getElementById("pokemonAbilities"),
        pokemonMovesElement: document.getElementById("pokemonMoves"),
        pokemonIdElement: document.getElementById("pokemonId")
    };

    /* Este objeto contiene las referencias de los botones */
    const buttons = {
        all : Array.from(document.getElementById("btn")),
        search : document.getElementById("btnSearch"),
        next : document.getElementById("btnUp"),
        previous : document.getElementById("btnDown")
    };
    // Esta función muestra el tipo de pokemon, recibe el resultado de la búsqueda de la API
    const processPokemonTypes = (pokemonData) => {
        let pokemonType = "";
        // Utilizo la primera clase para dar el color a los contenedores de movimientos y habilidades
        const firstClass = pokemonData.types[0].type.name;

        // ¿De dónde sale types, como sé es un arreglo? En la página de pokeapi(https://pokeapi.co/) puedes ver un ejemplo
        // del objeto que responde, pokemonData es ese objeto
        pokemonData.types.forEach((pokemonTypeData) => {
            // Se crea una etiqueta de clases por cada elemento type del arreglo
            pokemonType += `<span class="pokemon-type ${pokemonTypeData.type.name}">${pokemonTypeData.type.name}</span>`;
        });
        // Se quita la clase previa del contenedor de habilidades y movimientos si hay una
        if (currentClassType) {
            container.pokemonMovesElement.classList.remove(currentClassType);
            container.pokemonAbilitiesElement.classList.remove(currentClassType);
        }
        // Se agrega la clase del tipo del contenedor de habilidades y movimientos
        container.pokemonMovesElement.classList.add(firstClass);
        container.pokemonAbilitiesElement.classList.add(firstClass);
        currentClassType = firstClass;
        // Se agregan las etiquetas creadas previamente en nuestro forEach
        container.pokemonTypesContainer.innerHTML = pokemonType;
    };

   
    // Procesa las estadísticas del pokemon, recibe el objeto completo de la respuesta de la pokeapi
    const processPokemonStats = (pokemonData) => {
        // El operador '?.' se llama encadenamiento opcional, si el elemento a la izquierda es null o undefined
        // no ejecuta lo que esta a la derecha, más en https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Optional_chaining
        pokemonData.stats?.forEach((pokemonStatData) => {
            // Evalua el nombre de la estadística, y coloca su valor en su respectivo contenedor, y le aplica un
            // estilo de gradiente, para hacer más visual el efecto.
            switch (pokemonStatData.stat.name) {
                case "hp":
                    pokemonStatsElements.hp.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.hp.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%); `;
                    break;
                case "attack":
                    pokemonStatsElements.attack.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.attack.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%); `;
                    break;
                case "defense":
                    pokemonStatsElements.defense.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.defense.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%); `;
                    break;
                case "special-attack":
                    pokemonStatsElements.specialAttack.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.specialAttack.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%); `;
                    break;
                case "special-defense":
                    pokemonStatsElements.specialDefense.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.specialDefense.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%); `;
                    break;
                case "speed":
                    pokemonStatsElements.speed.innerHTML = pokemonStatData.base_stat;
                    pokemonStatsElements.speed.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%); `;
                    break;
            }
        });
    };
    // Procesa los movimientos del pokemon, y los coloca en su respectivo contenedor
    const processPokemonMoves = (pokemonData) => {
        let pokemonMovesContent = "";
        pokemonData.moves?.forEach((pokemonMove) => {
            pokemonMovesContent += `<li>${pokemonMove.move.name}</li>`;
        });
        container.pokemonMovesElement.innerHTML = pokemonMovesContent;
    };
    // Procesa las habilidades del pokemon, y los coloca en su respectivo contenedor
    const processPokemonAbilities = (pokemonData) => {
        let pokemonAbilitiesContent = "";
        pokemonData.abilities?.forEach((pokemonAbility) => {
            pokemonAbilitiesContent += `<li>${pokemonAbility.ability.name}</li>`;
        });
        container.pokemonAbilitiesElement.innerHTML = pokemonAbilitiesContent;
    };

    /**poner la imagen de cargando y deshablitar los otros botones */
    const setLoading = () => {
        container.imageContainer.innerHTML = imageTemplate.replace("{imgSrc}", images.imgLoading);
        buttons.all.forEach(button => button.disable = true);
    };

    //para volver a habilitar los botones
    const setLoadingComplete = () => {
        buttons.all.forEach(button => checkDisabled(button));
    };

    /**
     * esta funcion es la que consulta la pokeapi para obtener la informacion del pokemon solicitado
     * fetch nos sirve para hacer solicitudes a otros sitios, pero tambien se puede usar para cargar archivos locales 
     * fetch recive la url del recurso o destino de la peticion, y un objeto que nos ayud aa establecer algunos parametros de la peticion
     * fetch devuelve una promesa, por eso tiene un then y un catch por otro lado getPokemonData devuelve un objeto json con la informacion del pokmemon o en caso de error el objeto de la peticion que fallo para saber mas ingrese en: https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch
     */
    const getPokemonData = async(pokemonName) => fetch(`${pokeApiUrl}pokemon/${pokemonName}`, {
        /**Existen varios metodos de httm que siren entre otras cosas para especificar el tipo de peticion pero tambien son necesarios para enviar adecuadamente sus parametros para conocer mas ingrese:https://developer.mozilla.org/es/docs/Web/HTTP/Methods  */
        method : 'GET', /**get, post, put, delete, etc 
        en las cabeceras de la peticion se puede especificar el tipo de informaicon que vamos a utilizar, tambien aqui se suele colocar por ejemplo la identifad del usuario por si la peticion requiere alguna informacion de este tipo o por motivos de seguridad https://developer.mozilla.org/es/docs/Web/HTTP/Headers/Content-Type   */
        headers : {
            'Content-Type' : 'application/json'
        },
        /**body : JSON.stringify(miObjetoJson) || "" 
         * Esto sirve cuando tu peticion use un cuerpo por ejemplo (post y put) debes de convertlo en string
        */
       
    })
        .then((res)=> res.json())
        .catch((error) => ({requestFailed: true}));


    /**esta funcion valida si debe deshabilitar los botones o no en este caso unicamente el boton ingerior si esta en el ID 1 ya que no hay pokemon ID negativo */

    const checkDisabled = (button) => {
        button.disable = button.id === "btnDown" && container.pokemonIdElement.value <= 1;

    };

    /**esta funcion es la principal validar que reciba un nombre o id y realiza la busqueda del pokemon y procesa la respuesta para colocar los datos en suss respectivos campos */

    const setPokemonData = async (pokemonName) => {
        if(pokemonName){
            /**poner la imagen de busqueda y deshabilitar los botones en lo que realiza la busqueda */
            setLoading();
            /**realizar la consulta, en este caso con await esperar hasta tener respuesta primero hay que utilizar un operador ternario para poner el nombre en minuscula si es string */
            const pokemonData = await getPokemonData(typeof pokemonName === typeof "" ? pokemonName.toLowerCase() : pokemonName);

            if(pokemonData.requestFailed){
                //no hay pokemon T_T
                container.imageContainer.innerHTML = imageTemplate.replace("{imgSrc}", images.imgPokemonNotFound);
            }else{
                //poner las imagenes
                container.imageContainer.innerHTML = `${imageTemplate.replace("{imgSrc}", pokemonData.sprites.front_default)} ${imageTemplate.replace("{imgSrc}", pokemonData.sprites.front_shiny)}`;

                container.pokemonNameElement.innerHTML = pokemonData.name;
                container.pokemonIdElement.value = pokemonData.id;

                //el proceso de los datos
                processPokemonTypes(pokemonData);
                processPokemonStats(pokemonData);
                processPokemonAbilities(pokemonData);
                processPokemonMoves(pokemonData);
            }
        }else{
            /**esta es la fomra de utilizar SweetAlert  */
            Swal.fire({
                title: "Error!",
                text: "Ingresa el nombre de un pokemon primero",
                icon: "error",
                confirmButtonText: "Aceptar" 
            });
        }
    };

    const triggers = () => {
        // se le vincula la función de búsqueda al botón de buscar.
        buttons.search.onclick = () => setPokemonData(pokemonInput.value);
        // se le vincula la función de búsqueda al campo de texto para buscar cuando presionan enter
        pokemonInput.onkeyup = (event) => {
            event.preventDefault();
            if (event.key === "Enter") {
                setPokemonData(pokemonInput.value);
            }
        }
        // se le vincula la función de búsqueda al arriba y abajo, estos funcionan con el ID en lugar del campo de texto.
        buttons.next.onclick = () => setPokemonData(+containers.pokemonIdElement.value + 1);
        buttons.previous.onclick = () => setPokemonData(+containers.pokemonIdElement.value - 1);
    };
    setLoadingComplete();
    triggers();

};
window.onload = pokedex;