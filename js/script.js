// ####################################################################################################################
// Array en el que se guardarán todos los videojuegos
var videogamesList = new Array();

// Función para comprobar si la lista está o no vacía
function noEmptyList() {
    // Devuelve true si length en mayor que 0, en caso contrario devuelve false
    return videogamesList.length > 0;
}

// Función para dibujar la biblioteca
function drawLibrary() {
    if (!noEmptyList) {

    } else {
        var output = document.getElementById('output');

        output.innerHTML = "";

        videogamesList.forEach((videogame) => {
            output.innerHTML += '<div class="videogame-box border rounded-0 mx-auto mb-3 m-md-1">' +
                '<div class="videogame-image" data-toggle="modal" data-target="#' + videogame.ID + '">' +
                '<img src="images/videogames/' + videogame.boxImage + '" alt="Imagen de ' + videogame.name + '">' +
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
                '<button type="button" class="btn btn-danger rounded-0 no-focus" data-dismiss="modal">' +
                'Eliminar' +
                '</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
        });
    }
}

// Función para añadir un videojuego a la lista
function addVideogame(videogame) {
    // Añade un videojuego al final del array
    videogamesList.push(videogame);
}

// Función para eliminar un videojuego indicando su propiedad ID
function removeVideogameByID(videogameID) {
    let i = 0;
    let found = false;
    // Si se encuentra el ID en la lista se eliminará el videojuego
    while (i < videogamesList.length && !found) {
        if (videogamesList[i].ID === videogameID) {
            found = true;
            videogamesList.splice(i, 1);
        }

        i++;
    }
}

// Función para borrar toda la lista
function deleteEntireList() {
    // Para borrar el array se vuelve a instanciar
    videogamesList.length = 0;
}

// ####################################################################################################################
// => Formularios
// Función para crear un videojuego a partir de los datos de su formulario correspondiente
function addNewVideogameFromDataForm() {
    let name = getElementById('videogame-name').value;
    addVideogame(new Videogame(name, genre, developer, publisher, platform, rating, image));
}

// ####################################################################################################################
// *** clase Piece
// {Obra} Un videojuego es una obra o un producto si hablamos en términos más generales. Actuará como CLASE PADRE
// (superclase) de videojuego para hacer uso de la herencia
// -> Constructor
function Piece() {
    this.ID = uuidv1(); // UUID único
}

// ####################################################################################################################
// *** clase Videogame
// {Videojuego} Será una CLASE HIJA (subclase) de Piece, de la cuál heredará un identificador
// -> Constructor
function Videogame(name, genre, developer, publisher, platform, rating, image) {
    Piece.call(this); // Hereda la propiedad ID de Piece
    this.ID = "VG-" + this.ID; // Se sobrescribe el ID heredado añadiendo el String "VG" (VideoGame) al principio
    this.name = new String(name); // nombre
    this.genre = new String(genre); // genero/s
    this.developer = new String(developer); // empresa desarrolladora
    this.publisher = new String(publisher); // empresa editora
    this.platform = new String(platform); // plataforma/s
    this.rating = new String(rating); // calificación de edad
    this.boxImage = image;
    this.score = null; // valoracion
    this.sinceDate = new Date(); // fecha en la que se añade el videojuego a la biblioteca
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