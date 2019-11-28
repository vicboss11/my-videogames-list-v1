// *** clase Videogame (Videojuego)
// -> Constructor
function Videogame(name, developer, publisher, platform, year, genre, rating) {
    this.name = name; // nombre
    this.developer = developer; // empresa desarrolladora
    this.publisher = publisher; // empresa editora
    this.platform = platform; // plataforma/s
    this.year = year; // año de publicación
    this.genre = genre; // genero/s
    this.rating = rating; // calificación de edad
    this.score = null; // valoracion
}

Videogame.prototype.addScore = function (gameplay, graphics,
    art, sound, narrative, multiplayer) {
    this.score = new Score(gameplay, graphics, art,
        sound, narrative, multiplayer);
}

// *** clase VideogameSectionsScore (Puntuación de los distintos apartados de un videojuego)
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