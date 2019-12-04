// ####################################################################################################################
// ####################################################################################################################
// => SALIDA HTML

// Variable para acceder al elemento del DOM con id="output"
var output = document.getElementById('output');

// Función para limpiar el elemento con id="output"
function cleanOutput() {
    // Se asigna una cadena vacía
    output.innerHTML = "";
}

// ####################################################################################################################
// ####################################################################################################################
// => CLASES

// ####################################################################################################################
// *** clase VideogamesLibrary
// {Biblioteca de videojuegos} Clase en la cuál se almacenaran los videojuegos
// -> Constructor
function VideogamesLibrary() {
    this.list = new Array();
}

// -> Métodos
// Método para determinar si la biblioteca está o no vacía
VideogamesLibrary.prototype.isEmpty = function () {
    return this.list.length == 0;
}

// Método para añadir un videojuego a la biblioteca
VideogamesLibrary.prototype.add = function (Videogame) {
    // Se añade el videojuego a la propiedad list (Array) como último elemento 
    this.list.push(Videogame);
}

// Método para eliminar un videojuego de la biblioteca. Recibe como parámetro el ID del videojuego
VideogamesLibrary.prototype.remove = function (videogameID) {
    let i = 0;
    let found = false;
    // Si se encuentra el ID en la lista se eliminará el videojuego
    // La busqueda seguirá mientras el contador sea menor que el tamaño del Array 
    // y no se haya encontrado un videojuego con el ID que recibe por parámetro
    while (i < this.list.length && !found) {
        if (this.list[i].ID === videogameID) {
            found = true;
            this.list.splice(i, 1);
        }

        i++;
    }
}

// Método para eliminar todos lo videojuegos de la biblioteca
VideogamesLibrary.prototype.removeAll = function () {
    this.list.length = 0;
}

// Método para dibujar en el elemento del DOM con id="output" cada uno de los videojuegos guardados
// en la biblioteca
VideogamesLibrary.prototype.draw = function () {
    if (this.isEmpty()) {
        output.innerHTML = '<div class="d-flex flex-wrap justify-content-center my-5 mx-auto p-5">' +
            '<h3 class="text-center">' +
            'No has añadido ningún videojuego a tu <span class="title">biblioteca</span>' +
            '</h3>' +
            '</div>';
    } else {
        // Se limpia la salida
        cleanOutput();
        // Se recorre la lista mediante un forEach
        this.list.forEach((videogame) => {
            output.innerHTML += '<div class="videogame-box border rounded-0 mx-auto mb-3 m-md-1">' +
                '<div class="videogame-image" data-toggle="modal" data-target="#' + videogame.ID + '">' +
                '<img src="images/videogames/' + videogame.image + '" alt="Imagen de ' + videogame.name + '">' +
                '</div>' +
                '<div class="videogame-info text-dark text-center">' +
                '<div class="d-flex flex-row justify-content-center">' +
                '<div class="text-truncate">' +
                videogame.name +
                '</div>' +
                '</div>' +
                '<div class="d-flex flex-row justify-content-around videogame-options pt-2 px-4">' +
                '<div>' +
                '<button type="button" class="btn border rounded custom-btn no-focus"' +
                'data-toggle="modal" data-target="#' + videogame.ID + '" data-tooltip="tooltip" trigger="hover"' +
                'data-placement="bottom" title="Ver">' +
                '<i class="far fa-eye"></i>' +
                '</button>' +
                '</div>' +
                '<div>' +
                '<button type="button" class="btn border rounded custom-btn no-focus"' +
                'data-toggle="modal" data-target="#remove-videogame-' + videogame.ID + '" data-tooltip="tooltip" trigger="hover" data-placement="bottom" title="Eliminar">' +
                '<i class="far fa-trash-alt"></i>' +
                '</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="modal fade" id="' + videogame.ID + '" tabindex="-1" role="dialog">' +
                '<div class="modal-dialog modal-dialog-centered" role="document">' +
                '<div class="modal-content rounded-0">' +
                '<div class="modal-header">' +
                '<h5 class="modal-title title">' + videogame.name + '</h5>' +
                '<button type="button" class="close custom-btn no-focus" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '</div>' +
                '<div class="modal-body">' +
                '<div class="row justify-content-center">' +
                '<div class="col-12">' +
                '<strong>Nombre:</strong> ' + videogame.name +
                '</div>' +
                '</div>' +
                '<div class="row justify-content-center">' +
                '<div class="col-12">' +
                '<strong>Genero/s:</strong> ' + videogame.genre +
                '</div>' +
                '</div>' +
                '<div class="row justify-content-center">' +
                '<div class="col-12">' +
                '<strong>Desarrollador:</strong> ' + videogame.developer +
                '</div>' +
                '</div>' +
                '<div class="row justify-content-center">' +
                '<div class="col-12">' +
                '<strong>Editora:</strong> ' + videogame.publisher +
                '</div>' +
                '</div>' +
                '<div class="row justify-content-center">' +
                '<div class="col-12">' +
                '<strong>Platamorma/s:</strong> ' + videogame.platform +
                '</div>' +
                '</div>' +
                '<div class="row justify-content-center">' +
                '<div class="col-12">' +
                '<strong>PEGI:</strong> ' + videogame.rating +
                '</div>' +
                '</div>' +
                '<div class="row justify-content-center">' +
                '<div class="col-12 blockquote">' +
                'En tu colección desde el ' + videogame.sinceDate.getDate() + "-" + (videogame.sinceDate.getMonth() + 1) + "-" + videogame.sinceDate.getFullYear() +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="modal-footer">' +
                '<button type="button" class="btn btn-dark rounded-0 no-focus" data-dismiss="modal">' +
                'Salir' +
                '</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="modal fade" id="remove-videogame-' + videogame.ID + '" tabindex="-1" role="dialog">' +
                '<div class="modal-dialog modal-dialog-centered" role="document">' +
                '<div class="modal-content rounded-0">' +
                '<div class="modal-header">' +
                '<h5 class="modal-title title">ELIMINAR ' + videogame.name + '</h5>' +
                '<button type="button" class="close custom-btn no-focus" data-dismiss="modal" aria-label="Close">' +
                '<span aria-hidden="true">&times;</span>' +
                '</button>' +
                '</div>' +
                '<div class="modal-body">' +
                '<p class="text-center">' +
                '¿Seguro que quieres eliminar ' + videogame.name + ' de tu lista?' +
                '</p>' +
                '</div>' +
                '<div class="modal-footer">' +
                '<button type="button" class="btn btn-dark rounded-0 no-focus" data-dismiss="modal">' +
                'Cancelar' +
                '</button>' +
                '<button type="button" class="btn btn-danger rounded-0 no-focus" data-dismiss="modal" onclick="removeVideogame(\'' + videogame.ID + '\')">' +
                'Eliminar' +
                '</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
        });
    }
}

// ####################################################################################################################
// *** clase Piece
// {Obra} Un videojuego es una obra o un producto si hablamos en términos más generales. Actuará 
// como CLASE PADRE (superclase) de videojuego para hacer uso de la herencia
// -> Constructor
function Piece() {
    this.ID = uuidv1(); // UUID único
}

// ####################################################################################################################
// *** clase Videogame
// {Videojuego} Será una CLASE HIJA (subclase) de Piece, de la cuál heredará un identificador
// -> Constructor
function Videogame(name, genre, developer, publisher, platform, rating, image = "no-image.png") {
    Piece.call(this); // Hereda la propiedad ID de Piece
    this.ID = "VG-" + this.ID; // Se sobrescribe el ID heredado añadiendo el String "VG" (VideoGame) al principio
    this.name = name; // nombre
    this.genre = genre; // genero/s
    this.developer = developer; // empresa desarrolladora
    this.publisher = publisher; // empresa editora
    this.platform = platform; // plataforma/s
    this.rating = new Number(rating); // calificación de edad
    this.image = image; // imagen
    this.sinceDate = new Date(); // fecha en la que se añade el videojuego a la biblioteca
    this.score = null; // valoracion
}

// -> Herencia
Videogame.prototype = Object.create(Piece.prototype)
Videogame.prototype.constructor = Videogame;

// ####################################################################################################################
// *** clase VideogameSectionsScore
// Puntuación de los distintos apartados de un videojuego
// -> Constructor
// El narrative y el multiplayer son "opcionales" dependiendo del tipo
// de Videojuego que se vaya a valorar
function VideogameSectionsScore(gameplay, graphics, art,
    sound, narrative, multiplayer) {
    this.gameplay = gameplay; // jugabilidad
    this.graphics = graphics; // gráficos
    this.art = art; // apartado artistico
    this.sound = sound; // sonido
    this.narrative = narrative; // narrativa
    this.multiplayer = multiplayer; // multijugador
}

// -> Métodos
// Método para calcular la valoración media de un videojuego
VideogameSectionsScore.prototype.getAvgScore = function () {
    var sum = 0; // acumulador de sumas
    var count = 0; // contador

    // Se recorre el objeto como si se tratara de un Array. El nombre de cada propiedad
    // se guarda dentro de la variable property
    for (let property in this) {

        // Si la property es narrative o multiplayer y su valor es false, no se incrementará
        // ni la variable sum ni el count
        if ((property !== "narrative" && !this[property]) || (property !== "multiplayer" && !this[property])) {
            sum += this[property];
            count++;
        }

    }

    var avg = sum / count; // nota media
    var score = Math.round(avg * 10); // puntuación media sobre 100

    return score;
}

// ####################################################################################################################
// ####################################################################################################################
// => FORMULARIOS

// Función para añadir un videojuego a partir de los datos de su formulario correspondiente
function addNewVideogame() {
    // Crear una variable apuntando al formuario del que se quieren recoger los datos
    let addForm = document.forms['addVideogameForm'];

    // Obtener el nombre del videojuego
    let name = addForm.videogameName.value;

    // Obtener el/los genero/s del videojuego
    // Se obtiene el Array de los checkbox videogameGenre para recorrerlo mediante un bucle for
    // y guardar aquellos que estén marcados en otro Array
    let genreArr = addForm.videogameGenre;
    let genres = new Array();

    for (let i = 0; i < genreArr.length; i++) {
        if (genreArr[i].checked) {
            genres.push(genreArr[i].value);
        }
    }

    // Obtener el desarrollador y la editora del videojuego
    let developer = addForm.videogameDeveloper.value;
    let publisher = addForm.videogamePublisher.value;

    // Obtener la/s plataforma/s del videojuego
    // Se recibirá una cadena cuyos elementos estarán separados por coma y un espacio ", "
    let platform = addForm.videogamePlatform.value;
    // Platform se convierte en una array
    platform = platform.split(", ");

    // Se obtiene el Array de los radio button videogameRating para recorrerlo mediante 
    // un bucle for y guardar aquel que esté marcado en una variable
    let ratingArr = addForm.videogameRating;

    for (let i = 0; i < ratingArr.length; i++) {
        if (ratingArr[i].checked) {
            var rating = ratingArr[i].value;
        }
    }

    // Se obtiene la imagen seleccionada a través del Array files
    let fileInput = addForm.videogameImage;
    if (fileInput.files.length > 0) {
        var image = fileInput.files[0].name;
    }

    library.add(new Videogame(name, genres, developer, publisher, platform, rating, image));
    library.draw();
}

// ####################################################################################################################
// ####################################################################################################################
// => FUNCIONES EVENTOS

// Función para eliminar un videojuego
function removeVideogame(videogameID) {
    // Elimina el videojuego y dibuja la biblioteca
    library.remove(videogameID);
    library.draw();
}

// Función para eliminar todos los videojuegos
function removeAllVideogames() {
    // Elimina todos los videojuegos y dibuja la biblioteca
    library.removeAll();
    library.draw();
}

function drawVideogamesLibrary() {
    library.draw();
}

// ####################################################################################################################
// ####################################################################################################################
// => VALORES POR DEFECTO

var library = new VideogamesLibrary();