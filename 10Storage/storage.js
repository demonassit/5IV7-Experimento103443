/**
 * 
 * la siguiente clase nos ayudara a manejar una lista de tareas, de tal forma que sea mas sencillo agrupar y realizar las operaciones mas comunes 
 */

const Storage = () => {
    class StorageTodoAppHelper{
        constructor(storageName, initialValue){
            /**
             * La storage de esta api viene de : https://developer.mozilla.org/es/docs/Web/API/Storage 
             * provee el acceso al almacenamienot, existe por sesion y por almacenamienot loca, en este caso usaremos la tiene mayor persistencia en el LocalStorage
             * Storage usa simplemente conjuntos de clave, valor, getItem, nos dal el valor al proporcionar la clave y devuelve nulo si no existe
             */
            let currentStorage = localStorage.getItem(storageName);
            if(!currentStorage){
                /**si no existe aun la inicializamos */
                localStorage.setItem(storageName, JSON.stringify(initialValue));
                currentStorage = initialValue;
            }else{
                /**en caso contrario la convertimos, en un objeto json, storage solo almacena cadenas de texto por eso es necesario esta conversion */
                currentStorage = JSON.parse(currentStorage);
            }
            /**
             * Guadamos tanto los valores actuales como el nombre de la seccion de almacenamienot que utilizaremos. Los valores ya leidos se guardan para evitar la lectura y conversion cosntante de storage, lo cual puede demorar conforme el objeto crezca
             */
            //los hacemos privados
            this._storageName = storageName;
            this._currentValues = currentStorage;

        }

        addItem(newItem){
            /**cuando se agrega un valor, lo agreamos a los valores ya cargados, hacieno un resaldo en storage */
            this._currentValues.push(newItem);
            localStorage.setItem(this._storageName, JSON.stringify(this._currentValues));
        }

        getItem(findFunction){
            /**cuando se quiere consultar un valor en especifico, no es necesario buscarlo en storage, basta con consultar en los valores ya cargados */
            return this._currentValues.find(findFunction);
        }

        updateItem(findFunction, newItem){
            /**cuando se actualiza un valor, lo actualizamos a los valores ya cargados, haciendo un respaldo en storage */
            const itemIndex = this._currentValues.findIndex(findFunction);
            this._currentValues[itemIndex] = {...this._currentValues[itemIndex], ...newItem};
            localStorage.setItem(this._storageName, JSON.stringify(this._currentValues));
        }

        getItem(){
            /**cuando se quiere cosnultar los items, no es necesario buscarlo, basta de nuevo consultarlo directo */
            return this._currentValues;
        }

        deleteItem(findFunction){
            /**cuando se elimina un valor, lo actualizaremos a los valores ya cargados */
            this._currentValues.splice(this._currentValues.findIndex(findFunction), 1);
            localStorage.setItem(this._storageName, JSON.stringify(this._currentValues));
        }
        

    }


    /**se carga el template usando para crear elementos de la lista de tareas */
    const loadListItemTemplete = () =>{
        const templeteDomItem = document.getElementById("listItemTemplate");
        const template = templeteDomItem.innerHTML.trim();
        //una vez leida la plantilla se elimina
        templeteDomItem.remove();
        return template;
    };

    //catgamos los elemento del dom
    const DOMElements = {
        taskName : document.getElementById("txtTaskName"),
        addButton : document.getElementById("btnAddTask"),
        taskList : document.getElementById("taskList"),
        changeWallpaperButton : document.getElementById("btnChangeWallpaper"),
        editUser : document.getElementById("editUser")

    };

    //inicializamos la plantilla y la seccion de storage
    const listItemTemplate = loadListItemTemplete();
    const storage = new StorageTodoAppHelper("Storage", []);

    //esta funcion se usa para marcar una tarea como completada 

    const toggleTask = (domItem) => {

        if(domItem){
            storage.updateItem((item) => item.id === +domItem.id, {completed : !domItem.classList.contains("completed")});
        }
        if(!domItem.classList.contains("completed")){
            domItem.classList.add("completed");
        }else{
            domItem.classList.remove("completed");
        }

    };

    /**esta funcion se usa para eliminar una tarea de la lista */
    const deleteTask = (domItem) => {
        if(domItem){
            storage.deleteItem((item) => item.id === + domItem.id)
        }
        domItem.parentElement.remove();
    };

    //crea un elemento de la lista de tareas
    const createDOMTaskElement = (task) => {
        //creamos un elemento del DOM y llenamos los datos de la plantilla
        const template = document.createElement('li');
        template.innerHTML = listItemTemplate.replace("{id}", task.id).replace("{template}", task.value).replace("{completed}", task.completed ? "completed" : "");
        /**Accedemos a los nodos hijos creados de la plantilla, los cuales son los botones, y les asingamos los eventos a cada boton respecitvo */

        const ourContent = template.firstChild;

        ourContent.childNodes.forEach(child => {
            if(child.classList?.contains("complete")){
                child.onclick = () =>toggleTask(ourContent)
            }
            if(child.classList?.contains("delete")){
                child.onclick = () =>deleteTask(ourContent)
            }
        });
        //agregamos el elemento recien creado a la lsita de tareas
        DOMElements.taskList.append(template);
    }

    //esta funcion es para renderizado
    const renderTask = () => {
        //si no tiene tareas la lsita, lo indicamos
        DOMElements.taskList.innerHTML = storage.getItem() ? "" : "<li>No hay tareas aun</li>";
        //procesamos los elemenots que cargamos del storage
        storage.getItems().forEach(task => createDOMTaskElement(task));
        
    };

    //esta funcion de agregar una nueva tarea a la lista
    const addTask = () => {
        if(DOMElements.taskName.value){
            const newTask = {
                id : Date.now,
                value : DOMElements.taskName.value,
                completed : false
            }
            //guardamos el elemento en storage y limpaimos el campo de texto para crear el elemenot de la nueva tarea
            storage.addItem(newTask);
            DOMElements.taskName.value = "";
            createDOMTaskElement(newTask);
        }
    };

    /**solicita que el usuario se registre es de esta forma que se crean las sesiones en una aplicacion de front end solo que se suelen usar token, en lugar del nombre, y en lugar de solicitarlo por un dialogo, se hace uso de fetch para pedir a un servidor el token, usualmente propcionado el nombre de usuario y contraseña */

    const requestUser = async () => {
        const {value : userName} = await Swal.fire({
            input : 'text',
            inputLabel : 'Intorduce tu nombre',
            allowOutsideClick : false,
            allowEscapeKey : false,
            inputValidador : (value) => {
                if(!value?.trim()){
                    return 'Introduce tu nombre!'
                }
            },
            inputPlaceHolder : 'Introduce tu nombre'
        });
        if(userName){
            //como puedes ver funciona de forma igual a como se guardan las tareas del ejeercicio
            localStorage.setItem("userName", userName);
            document.getElementById("title").innerHTML = `Bienvenido ${userName}!`;
        }

    };

    //Esta funcion cambia el wallpaper de la funcion
    const changeWallpaper = async () =>{
        const {value : url} = await Swal.fire({
            input : 'url',
            inputLabel : 'Intorduce la URL del wallpaper',
            inputPlaceholder : 'Introduce la URL del wallpaper',
            validationMessage : "La URL no es valida",
        });

        if(url){
            localStorage.setItem("wallpaper", url),
            document.querySelector("body").style.background = 
            `url(${url}) no-repeat center`;
        }
    };

    // Esta función simplemente agrega las acciones a los botones
    const triggers = () => {
        DOMElements.addButton.onclick = addTask;
        DOMElements.taskName.onkeyup = (event) => {
            event.preventDefault();
            if (event.key === "Enter" && DOMElements.taskName.value) {
                storage.addItem({
                    id: Date.now(),
                    value: DOMElements.taskName.value,
                    completed: false
                });
                renderTasks();
                DOMElements.taskName.value = "";
            }
        };
        DOMElements.changeWallpaperButton.onclick = changeWallpaper;
        DOMElements.editUser.onclick = requestUser;
    };
    // Esta función inicializa los elementos necesarios
    const init = () => {
        // verifica si tiene un wallpaper almacenado
        const currentWallpaper = localStorage.getItem("wallpaper");
        if (currentWallpaper) {
            document.querySelector("body").style.background = `url(${currentWallpaper}) no-repeat center`;
        }
        // verifica si tiene el usuario ya puso su nombre, si no, lo solicita
        const currentUserName = localStorage.getItem("userName");
        if (!currentUserName) {
            requestUser();
        } else {
            document.getElementById("title").innerHTML = `Bienvenido ${currentUserName}!`;
        }
        // asigna las acciones a los botones y pinta las tareas previamente guardadas
        triggers();
        renderTasks();
    };

    // llama a la función de inicializar
    init();


};
window.onload = Storage;