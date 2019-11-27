// *** clase Videojuego
// -> Constructor
function Videojuego(nombre, desarrollador, editor, plataformas, generos) {
    this.nombre = nombre;
    this.desarrollador = desarrollador;
    this.editor = editor;
    this.plataformas = plataformas;
    this.generos = generos;
    this.valoracion = null;
}

Videojuego.prototype.anadirValoracion = function (apartadoJugable, apartadoTecnico,
    apartadoArtistico, apartadoSonoro, apartadoNarrativo = null, apartadoOnline = null) {
    this.valoracion = new Valoracion(apartadoJugable, apartadoTecnico, apartadoArtistico,
        apartadoSonoro, apartadoNarrativo, apartadoOnline);
}

// *** clase Valoracion
// -> Constructor
// El apartadoNarrativo y el apartadoOnline son "opcionales" dependiendo del tipo
// de Videojuego que se vaya a valorar
function Valoracion(apartadoJugable, apartadoTecnico, apartadoArtistico,
    apartadoSonoro, apartadoNarrativo = null, apartadoOnline = null) {
    this.apartadoJugable = apartadoJugable;
    this.apartadoTecnico = apartadoTecnico;
    this.apartadoArtistico = apartadoArtistico;
    this.apartadoSonoro = apartadoSonoro;
    this.apartadoNarrativo = apartadoNarrativo;
    this.apartadoOnline = apartadoOnline;
}

// -> Métodos
// Método para calcular la valoración media de un Videojuego
Valoracion.prototype.calcularValoracionMedia = function () {
    var suma = 0;
    var contador = 0;
    // Se recorre el objeto como si se tratara de un Array. El nombre de cada propiedad
    // se guarda dentro de la variable propiedad
    for (let propiedad in this) {

        // Si la propiedad es apartadoNarrativo o apartadoOnline y su valor es null, no se incrementará
        // ni la variable suma ni el contador
        if ((propiedad !== "apartadoNarrativo" && this[propiedad] !== null) || (propiedad !== "apartadoOnline" && this[propiedad] !== null)) {
            suma += this[propiedad];
            contador++;
        }

    }

    var media = suma / contador;
    var valoracion = Math.round(media * 10);

    return valoracion;
}