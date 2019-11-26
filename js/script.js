// *** clase Videojuego
function Videojuego(nombre, desarrollador, editor, plataformas, generos, multijugador) {
    this.nombre = nombre;
    this.desarrollador = desarrollador;
    this.editor = editor;
    this.plataformas = plataformas;
    this.generos = generos;
    this.multijugador = multijugador;
}

// Setters
Videojuego.prototype.setNombre = function (nombre) {
    this.nombre = nombre;
}

Videojuego.prototype.setDesarrollador = function (desarrollador) {
    this.desarrollador = desarrollador;
}

Videojuego.prototype.setEditor = function (editor) {
    this.editor = editor;
}

Videojuego.prototype.setPlataformas = function (plataformas){
    this.plataformas = plataformas;
}

Videojuego.prototype.setGeneros = function(generos){
    this.generos = generos;
}

Videojuego.prototype.setMultijugador = function(multijugador){
    this.multijugador = multijugador;
}