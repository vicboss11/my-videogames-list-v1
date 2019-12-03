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
            output.innerHTML += '<div class="col-auto my-3">' +
                '<div class="videogame-box border rounded">' +
                '<div class="videogame-image">' +
                '<img src="images/videogames/' + videogame.boxImage + '" alt="Imagen de ' + videogame.name + '">' +
                '</div>' +
                '<div class="videogame-info text-dark text-center">' +
                '<p>' + videogame.name + '</p>' +
                '</div>' +
                '</div>' +
                '</div>';
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
    videogamesList = new Array();
}

// ####################################################################################################################
// *** clase Piece
// {Obra} Un videojuego es una obra o un producto si hablamos en términos más generales. Actuará como CLASE PADRE
// (superclase) de videojuego para hacer uso de la herencia
// -> Constructor
function Piece() {
    this.ID = uuid.v1(); // UUID único
}

// ####################################################################################################################
// *** clase Videogame
// {Videojuego} Será una CLASE HIJA (subclase) de Piece, de la cuál heredará un identificador
// -> Constructor
function Videogame(name, genre, developer, publisher, platform, releaseDate, rating, image) {
    Piece.call(this, ID); // Hereda la propiedad ID de Piece
    this.ID = "VG" + this.ID; // Se sobrescribe el ID heredado añadiendo el String "VG" (VideoGame) al principio
    this.name = new String(name); // nombre
    this.genre = new String(genre); // genero/s
    this.developer = new String(developer); // empresa desarrolladora
    this.publisher = new String(publisher); // empresa editora
    this.platform = new String(platform); // plataforma/s
    this.releaseDate = new Date(Date.parse(releaseDate)); // fecha de lanzamiento
    this.rating = new String(rating); // calificación de edad
    this.boxImage = new Image().src(image);
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