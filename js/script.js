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
// Devuelve un boolean
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

// Método para buscar videojuegos por nombre
// Recibe por parámetro un string
// Devuelve un objeto de la clase VideogamesLibrary que contiene las coincidencias encontradas
VideogamesLibrary.prototype.searchByName = function (string) {
    let txt = new String(string);
    let libraryCoincidences = new VideogamesLibrary();

    for (var i = 0; i < this.list.length; i++) {
        if (this.list[i].name.toUpperCase().includes(txt.toUpperCase())) {
            libraryCoincidences.list.push(this.list[i]);
        }
    }

    return libraryCoincidences;
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
function Videogame(name, genre, developer, publisher, platform, rating, image = "no-image-min.png") {
    Piece.call(this); // Hereda la propiedad ID de Piece
    this.ID = "VG-" + this.ID; // Se sobrescribe el ID heredado añadiendo el String "VG" (VideoGame) al principio
    this.name = name; // nombre
    this.genre = genre; // genero/s
    this.developer = developer; // empresa desarrolladora
    this.publisher = publisher; // empresa editora
    this.platform = platform; // plataforma/s
    this.rating = new Number(rating); // calificación de edad
    this.image = image; // imagen
    const NOW_DATE = new Date();
    this.sinceDate = NOW_DATE.getDate() + "-" + (NOW_DATE.getMonth() + 1) + "-" + NOW_DATE.getFullYear(); // fecha en la que se añade el videojuego a la biblioteca
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
    // Variable apuntando al formuario del que se quieren recoger los datos
    let addForm = document.forms['add-videogame-form'];

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
    saveData();
    start();
}

function searchVideogameByName() {
    // Variable apuntando al formuario del que se quieren recoger los datos
    let searchForm = document.forms['search-by-name-form'];

    // Se obtiene el string a buscar
    let search = searchForm.searchByNameInput.value;

    let librarySearch = library.searchByName(search);

    if (search.length > 1) {
        librarySearch.isEmpty() ? showNoNamesCoincidencesMessage(search) : drawVideogamesLibrary(librarySearch);
    }
}

// ####################################################################################################################
// ####################################################################################################################
// => FUNCIONES EVENTOS

// Función con la que comenzará el html
function start() {
    library.isEmpty() ? showEmptyLibraryMessage() : drawVideogamesLibrary(library);
}

// Función para eliminar un videojuego
function removeVideogame(videogameID) {
    // Elimina el videojuego y dibuja la biblioteca
    library.remove(videogameID);
    saveData();
    start();
}

// Función para eliminar todos los videojuegos
function removeAllVideogames() {
    // Elimina todos los videojuegos y dibuja la biblioteca
    library.removeAll();
    saveData();
    start();
}

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

// Función para dibujar una biblioteca
// Debe recibir un objeto de la clase VideogamesLibrary por parámetro
// Dibuja en el elemento del DOM con id="output" cada uno de los videojuegos
// guardados en la biblioteca pasada por parámetro
function drawVideogamesLibrary(VideogamesLibrary) {
    // Se limpia la salida
    cleanOutput();
    // Se recorre la lista mediante un forEach
    VideogamesLibrary.list.forEach((videogame) => {
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
            '<div class="col-12 lead">' +
            'En tu colección desde el ' + videogame.sinceDate +
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

// Mensaje en caso de que no haya ningún videojuego en la biblioteca
function showEmptyLibraryMessage() {
    output.innerHTML = '<div class="d-flex flex-wrap justify-content-center my-5 mx-auto p-5">' +
        '<h3 class="text-center">' +
        'No has añadido ningún videojuego a tu <span class="title">biblioteca</span>' +
        '</h3>' +
        '</div>';
}

// Mensaje en caso de que no haya ninguna coincidencia en la búsqueda
function showNoNamesCoincidencesMessage(name) {
    output.innerHTML = '<div class="d-flex flex-wrap justify-content-center my-5 mx-auto p-5">' +
        '<h4 class="text-center">' +
        '<strong>No se ha encontrado ninguna coincidencia para:</strong> ' + name +
        '</h4>' +
        '</div>';
}

// ####################################################################################################################
// ####################################################################################################################
// => FUNCIONES PERSISTENCIA DE DATOS CON JSON

function saveData() {
    localStorage.setItem("list", JSON.stringify(library.list));
}

function loadData() {
    library.list = JSON.parse(localStorage.getItem("list"));
}

// ####################################################################################################################
// ####################################################################################################################
// => VALORES POR DEFECTO

var library = new VideogamesLibrary();

if (JSON.parse(localStorage.getItem("list"))) {
    loadData();
} else {
    library.add(new Videogame("Metal Gear Solid V Ground Zeroes", ["acción", "infiltración", "TPS"], "Kojima Productions", "Konami", ["PS4"], 18, "Metal Gear Solid V Ground Zeroes-min.jpg"));
    library.add(new Videogame("Metal Gear Solid V The Phantom Pain", ["acción", "infiltración", "TPS"], "Kojima Productions", "Konami", ["PS4"], 18, "Metal Gear Solid V The Phantom Pain-min.jpg"));
    library.add(new Videogame("Metal Gear Solid", ["acción", "infiltración", "TPS"], "Kojima Productions", "Konami", ["PS3"], 18, "Metal Gear Solid-min.jpg"));
    library.add(new Videogame("Metal Gear Solid 2 Sons of Liberty", ["acción", "infiltración", "TPS"], "Kojima Productions", "Konami", ["PS3"], 18, "Metal Gear Solid 2 Sons of Liberty-min.jpg"));
    library.add(new Videogame("Metal Gear Solid 3 Snake Eater", ["acción", "infiltración", "TPS"], "Kojima Productions", "Konami", ["PS3", "Nintendo 3DS"], 18, "Metal Gear Solid 3 Snake Eater-min.jpg"));
    library.add(new Videogame("Metal Gear Solid 4 Guns of the Patriots", ["acción", "infiltración", "TPS"], "Kojima Productions", "Konami", ["PS3"], 18, "Metal Gear Solid 4 Guns of the Patriots-min.jpg"));
    library.add(new Videogame("Metal Gear", ["acción", "infiltración"], "Kojima Productions", "Konami", ["PS3"], 12, "Metal Gear-min.jpg"));
    library.add(new Videogame("Metal Gear 2 Solid Snake", ["acción", "infiltración"], "Kojima Productions", "Konami", ["PS3"], 12, "Metal Gear 2 Solid Snake-min.jpg"));
    library.add(new Videogame("A Way Out", ["acción", "aventuras", "puzles"], "Hazelight Studios", "Electronic Arts", ["PS4"], 18, "A Way Out-min.jpg"));
    library.add(new Videogame("Assassin's Creed III", ["acción", "aventuras", "infiltración"], "Ubisoft", "Ubisoft", ["Wii U"], 18, "Assassin's Creed III-min.jpg"));
    library.add(new Videogame("Assassin's Creed IV Black Flag", ["acción", "aventuras", "infiltración"], "Ubisoft", "Ubisoft", ["PS4"], 18, "Assassin's Creed IV Black Flag-min.jpg"));
    library.add(new Videogame("Assassin's Creed Rogue", ["acción", "aventuras", "infiltración"], "Ubisoft", "Ubisoft", ["PS4"], 18, "Assassin's Creed Rogue-min.jpg"));
    library.add(new Videogame("Assassin's Creed Unity", ["acción", "aventuras", "infiltración"], "Ubisoft", "Ubisoft", ["PS4"], 18, "Assassin's Creed Unity-min.jpg"));
    library.add(new Videogame("Astral Chain", ["acción", "puzles"], "Platinum Games", "Nintendo", ["Switch"], 16, "Astral Chain-min.jpg"));
    library.add(new Videogame("Bayonetta", ["acción"], "Platinum Games", "Sega, Nintendo", ["Wii U"], 18, "Bayonetta-min.jpg"));
    library.add(new Videogame("Bayonetta 2", ["acción"], "Platinum Games", "Sega, Nintendo", ["Wii U"], 18, "Bayonetta 2-min.jpg"));
    library.add(new Videogame("Batman Arkham Asylum", ["acción", "infiltración"], "Rocksteady Studios", "Warner Bros. Interactive Entertainment", ["PC"], 16, "Batman Arkham Asylum-min.jpg"));
    library.add(new Videogame("Batman Arkham City", ["acción", "infiltración"], "Rocksteady Studios", "Warner Bros. Interactive Entertainment", ["PC", "Wii U"], 16, "Batman Arkham City-min.jpg"));
    library.add(new Videogame("Batman Arkham Knight", ["acción", "infiltración"], "Rocksteady Studios", "Warner Bros. Interactive Entertainment", ["PC", "PS4"], 16, "Batman Arkham Knight-min.jpg"));
    library.add(new Videogame("Batman Arkham Origins", ["acción", "infiltración"], "WB Games Montreal", "Warner Bros. Interactive Entertainment", ["Wii U"], 16, "Batman Arkham Origins-min.png"));
    library.add(new Videogame("Battlefield 4", ["acción", "FPS"], "DICE", "Electronic Arts", ["PS4"], 18, "Battlefield 4-min.png"));
    library.add(new Videogame("Battlefield 1", ["acción", "FPS"], "DICE", "Electronic Arts", ["PS4"], 18, "Battlefield 1-min.jpg"));
    library.add(new Videogame("Heavy Rain", ["acción"], "Quantic Dream", "Sony Computer Entertainment", ["PS4"], 18, "Heavy Rain-min.jpg"));
    library.add(new Videogame("Beyond Two Souls", ["acción"], "Quantic Dream", "Sony Computer Entertainment", ["PS4"], 18, "Beyond Two Souls-min.jpg"));
    library.add(new Videogame("Detroit Become Human", ["acción"], "Quantic Dream", "Sony Computer Entertainment", ["PS4"], 18, "Detroit Become Human-min.png"));
    library.add(new Videogame("Bloodborne", ["acción", "RPG"], "From Software", "SCE Japan Studio, Sony Interactive Entertainment", ["PS4"], 18, "Bloodborne-min.jpg"));
    library.add(new Videogame("Sekiro Shadows Die Twice", ["acción", "RPG"], "From Software", "Activision", ["PS4"], 18, "Sekiro Shadows Die Twice-min.jpg"));
    library.add(new Videogame("Call of Duty Black Ops II", ["acción", "FPS"], "Treyarch", "Activision", ["Wii U"], 18, "Call of Duty Black Ops II-min.jpg"));
    library.add(new Videogame("Call of Duty Black Ops III", ["acción", "FPS"], "Treyarch", "Activision", ["PS4"], 18, "Call of Duty Black Ops III-min.jpg"));
    library.add(new Videogame("Call of Duty Ghosts", ["acción", "FPS"], "Infinity Ward", "Activision", ["Wii U"], 18, "Call of Duty Ghosts-min.jpg"));
    library.add(new Videogame("Castlevania Lords of Shadow", ["acción"], "MercurySteam", "Konami", ["PC"], 18, "Castlevania Lords of Shadow-min.jpg"));
    library.add(new Videogame("Castlevania Lords of Shadow - Mirror of Fate", ["acción"], "MercurySteam", "Konami", ["PC, Nintendo 3DS"], 18, "Castlevania Lords of Shadow Mirror of Fate-min.png"));
    library.add(new Videogame("Dishonored", ["acción", "aventuras", "infiltración"], "Arkane Studios", "Bethesda Softworks", ["PS4"], 18, "Dishonored-min.jpg"));
    library.add(new Videogame("Dishonored 2", ["acción", "aventuras", "infiltración"], "Arkane Studios", "Bethesda Softworks", ["PS4"], 18, "Dishonored 2-min.png"));
    library.add(new Videogame("Dishonored La Muerte del Forastero", ["acción", "aventuras", "infiltración"], "Arkane Studios", "Bethesda Softworks", ["PS4"], 18, "Dishonored Death of the Outsider-min.jpg"));
    library.add(new Videogame("Fallout 4", ["acción", "aventuras", "RPG"], "Bethesda Game Studios", "Bethesda Softworks", ["PS4"], 18, "Fallout 4-min.jpg"));
    library.add(new Videogame("Far Cry 4", ["acción", "aventuras", "FPS"], "Ubisoft", "Ubisoft", ["PS4"], 18, "Far Cry 4-min.jpg"));
    library.add(new Videogame("Final Fantasy X/X-2 HD Remaster", ["aventuras", "RPG"], "Square", "Square Enix", ["PS4"], 12, "Final Fantasy X_X-2 HD Remaster-min.jpg"));
    library.add(new Videogame("Game of Thrones A Telltale Games Stories", ["acción", "aventuras"], "Telltale Games", "HBO", ["PS4"], 18, "Game of Thrones A Telltale Games Stories-min.jpg"));
    library.add(new Videogame("God of War", ["acción", "aventuras"], "SCE Santa Monica Studio", "Sony Computer Entertainment", ["PS4"], 18, "God of War I-min.jpg"));
    library.add(new Videogame("God of War II", ["acción", "aventuras"], "SCE Santa Monica Studio", "Sony Computer Entertainment", ["PS4"], 18, "God of War II-min.png"));
    library.add(new Videogame("God of War III", ["acción", "aventuras"], "SCE Santa Monica Studio", "Sony Computer Entertainment", ["PS4"], 18, "God of War III-min.jpg"));
    library.add(new Videogame("God of War Chains of Olympus", ["acción", "aventuras"], "Ready at Dawn Studios", "Sony Computer Entertainment", ["PS4"], 18, "God of War Chains of Olympus-min.png"));
    library.add(new Videogame("God of War Ghost of Sparta", ["acción", "aventuras"], "Ready at Dawn Studios, SCE Santa Monica Studio", "Sony Computer Entertainment", ["PS4"], 18, "God of War Ghost of Sparta-min.jpg"));
    library.add(new Videogame("God of War", ["acción", "aventuras"], "SCE Santa Monica Studio", "Sony Computer Entertainment", ["PS4"], 18, "God of War-min.jpg"));
    library.add(new Videogame("God of War Ascension", ["acción", "aventuras"], "SCE Santa Monica Studio", "Sony Computer Entertainment", ["PS4"], 18, "God of War Acension-min.jpg"));
    library.add(new Videogame("La Tierra Media: Sombras de Mordor", ["acción", "aventuras"], "Monolith Productions", "Warner Bros. Interactive Entertainment", ["PS4"], 18, "Middle-earth Shadow of Mordor-min.jpg"));
    library.add(new Videogame("Monster Hunter 3 Ultimate", ["acción", "RPG"], "Capcom", "Capcom", ["Wii U"], 12, "Monster Hunter 3 Ultimate-min.jpg"));
    library.add(new Videogame("New Super Mario Bros. U", ["plataformas"], "Nintendo", "Nintendo", ["Wii U"], 18, "New Super Mario Bros. U-min.jpg"));
    library.add(new Videogame("Ni no Kuni II El Renacer de un Reino", ["aventuras", "RPG"], "Level-5", "Bandai Namco Entertainment", ["PS4"], 12, "Ni no Kuni II Revenant Kingdom-min.jpg"));
    library.add(new Videogame("NieR Automata", ["acción", "RPG"], "Platinum Games", "Square Enix", ["PS4"], 18, "NieR Automata-min.jpg"));
    library.add(new Videogame("Overwatch", ["acción", "FPS"], "Blizzard Entertainment", "Blizzard Entertainment", ["PC"], 12, "Overwatch-min.png"));
    library.add(new Videogame("Pillars of Eternity", ["RPG"], "Obsidian Entertainment", "Paradox Interactive", ["PC"], 16, "Pillars of Eternity-min.jpg"));
    library.add(new Videogame("Red Dead Redemption", ["acción", "aventuras"], "Rockstar Games", "Take-Two Interactive", ["PS3"], 18, "Red Dead Redemption-min.jpg"));
    library.add(new Videogame("Red Dead Redemption 2", ["acción", "aventuras"], "Rockstar Games", "Take-Two Interactive", ["PS4"], 18, "Red Dead Redemption 2-min.jpg"));
    library.add(new Videogame("Ryse Son of Rome", ["acción", "aventuras"], "Crytek", "Microsoft Game Studios, Deep Silver", ["PC"], 18, "Ryse Son of Rome-min.jpg"));
    library.add(new Videogame("Spec Ops The Line", ["acción", "TPS"], "	Yager Development", "2K Games, Take-Two Interactive", ["PC"], 18, "Spec Ops The Line-min.jpg"));
    library.add(new Videogame("The Evil Within", ["acción", "survival", "TPS"], "Tango Gameworks", "Bethesda Softworks", ["PS4"], 18, "The Evil Within-min.jpg"));
    library.add(new Videogame("Splatoon", ["acción", "TPS"], "Nintendo", "Nintendo", ["Wii U"], 7, "Splatoon-min.jpg"));
    library.add(new Videogame("Star Wars Battlefront", ["acción", "FPS"], "DICE", "Electronic Arts", ["PS4"], 18, "Star Wars Battlefront-min.jpg"));
    library.add(new Videogame("Star Wars Battlefront II", ["acción", "FPS"], "DICE", "Electronic Arts", ["PS4"], 18, "Star Wars Battlefront II-min.jpg"));
    library.add(new Videogame("Super Mario 3D Land", ["plataformas"], "Nintendo", "Nintendo", ["Nintendo 3DS"], 3, "Super Mario 3D Land-min.jpg"));
    library.add(new Videogame("Super Mario 3D World", ["plataformas"], "Nintendo", "Nintendo", ["Wii U"], 3, "Super Mario 3D World-min.jpg"));
    library.add(new Videogame("Super Mario Odyssey", ["plataformas"], "Nintendo", "Nintendo", ["Switch"], 7, "Super Mario Odyssey-min.jpg"));
    library.add(new Videogame("Super Smash Bros. for Wii U", ["acción", "lucha"], "Sora Ltd., Bandai Namco Studios", "Nintendo", ["Wii U"], 18, "Super Smash Bros. for Wii U-min.jpg"));
    library.add(new Videogame("The Last Guardian", ["acción", "aventuras"], "SCE Japan Studio", "Sony Computer Entertainment", ["PS4"], 18, "The Last Guardian-min.jpg"));
    library.add(new Videogame("The Last of Us Remastered", ["acción", "survival"], "Naughty Dog", "Sony Computer Entertainment", ["PS4"], 18, "The Last of Us Remastered-min.jpg"));
    library.add(new Videogame("The Legend of Zelda Breath of the Wild", ["acción", "aventuras", "puzles"], "Nintendo", "Nintendo", ["Wii U"], 12, "The Legend of Zelda Breath of the Wild-min.jpg"));
    library.add(new Videogame("The Legend of Zelda The Wind Waker HD", ["acción", "aventuras", "puzles"], "Nintendo", "Nintendo", ["Wii U"], 12, "The Legend of Zelda The Wind Waker HD-min.jpg"));
    library.add(new Videogame("The Legend of Zelda Twilight Princess HD", ["acción", "aventuras", "puzles"], "Nintendo", "Nintendo", ["Wii U"], 12, "The Legend of Zelda Twilight Princess HD-min.jpg"));
    library.add(new Videogame("The Order 1886", ["acción", "TPS"], "Ready at Dawn, SCE Santa Monica Studio", "Sony Computer Entertainment", ["PS4"], 18, "The Order 1886-min.jpg"));
    library.add(new Videogame("The Witcher Enhanced Edition", ["acción", "aventuras", "RPG"], "CD Project RED", "Bandai Namco Entertainment", ["PC"], 18, "The Witcher Enhanced Edition-min.jpg"));
    library.add(new Videogame("The Witcher 2 Assassins of Kings", ["acción", "aventuras", "RPG"], "CD Project RED", "Bandai Namco Entertainment", ["PC"], 18, "The Witcher 2 Assassins of Kings-min.jpg"));
    library.add(new Videogame("The Witcher 3 Wild Hunt", ["acción", "aventuras", "RPG"], "CD Project RED", "Atari", ["PC"], 18, "The Witcher 3 Wild Hunt-min.jpg"));
    library.add(new Videogame("The Wonderful 101", ["acción", "aventuras"], "Platinum Games", "Nintendo", ["Wii U"], 12, "The Wonderful 101-min.jpg"));
    library.add(new Videogame("This War of Mine", ["acción", "aventuras"], "11 bit studios", "Deep Silver", ["PC", "PS4"], 12, "This War of Mine-min.jpg"));
    library.add(new Videogame("Tom Clancy's Splinter Cell Blacklist", ["acción", "infiltración", "TPS"], "Ubisoft", "Ubisoft", ["PC", "Wii U"], 18, "Tom Clancy's Splinter Cell Blacklist-min.jpg"));
    library.add(new Videogame("Uncharted El Tesoro de Drake", ["acción", "aventuras", "TPS"], "Naughty Dog", "Sony Computer Entertainment", ["PS4"], 18, "Uncharted Drake's Fortune-min.jpg"));
    library.add(new Videogame("Uncharted 2 El Reino de los Ladrones", ["acción", "aventuras", "TPS"], "Naughty Dog", "Sony Computer Entertainment", ["PS4"], 18, "Uncharted 2 Among Thieves-min.jpg"));
    library.add(new Videogame("Uncharted 3 La Traición de Drake", ["acción", "aventuras", "TPS"], "Naughty Dog", "Sony Computer Entertainment", ["PS4"], 18, "Uncharted 3 Drake's Deception-min.jpg"));
    library.add(new Videogame("Uncharted 4 El Desenlace del Ladrón", ["acción", "aventuras", "TPS"], "Naughty Dog", "Sony Computer Entertainment", ["PS4"], 18, "Uncharted 4 A Thief's End-min.jpg"));
    library.add(new Videogame("Uncharted EL Legado Perdido", ["acción", "aventuras", "TPS"], "Naughty Dog", "Sony Computer Entertainment", ["PS4"], 18, "Uncharted The Lost Legacy-min.png"));
    library.add(new Videogame("Until Dawn", ["acción", "aventuras", "survival"], "Supermassive Games", "Sony Computer Entertainment", ["PS4"], 18, "Until Dawn-min.jpg"));
    library.add(new Videogame("Valiant Hearts The Great War", ["aventuras"], "Ubisoft Montpellier", "Ubisoft", ["PS4"], 12, "Valiant Hearts The Great War-min.jpg"));
    library.add(new Videogame("Watch Dogs", ["acción", "aventuras"], "Ubisoft", "Ubisoft", ["PC"], 18, "Watch Dogs-min.jpg"));
    library.add(new Videogame("Wolfenstein The New Order", ["acción", "FPS"], "	MachineGames", "Bethesda Softworks", ["PS4"], 18, "Wolfenstein The New Order-min.jpg"));
    library.add(new Videogame("Zombi U", ["acción", "survival"], "Ubisoft Montpellier", "Ubisoft", ["Wii U"], 18, "Zombi-min.jpg"));
    library.add(new Videogame("Pikmin 3", ["aventuras", "RTS"], "Nintendo", "Nintendo", ["Wii U"], 7, "Pikmin 3-min.jpg"));
    library.add(new Videogame("Grand Theft Auto V", ["acción", "aventuras"], "Rockstar Games", "Take-Two Interactive", ["PS4"], 18, "Grand Theft Auto V-min.jpg"));
    library.add(new Videogame("Hyrule Warriors", ["acción", "aventuras"], "Omega Force, Team Ninja", "Koei Tecmo", ["Wii U"], 12, "Hyrule Warriors-min.jpg"));
    library.add(new Videogame("Life is Strange", ["aventuras"], "Dontnod Entertainment", "Square Enix", ["PS4"], 16, "Life is Strange-min.jpg"));
    library.add(new Videogame("Mafia III", ["acción", "aventuras", "TPS"], "Hangar 13", "2K Games", ["PS4"], 18, "Mafia III-min.jpg"));
    library.add(new Videogame("Mario & Luigi Viaje al centro de Bowser", ["aventuras", "plataformas", "puzles", "RPG"], "AlphaDream", "Nintendo", ["Nintendo 3DS"], 3, "Mario & Luigi Bowser's Inside Story-min.jpg"));
    library.add(new Videogame("Mario Kart 7", ["carreras"], "Nintendo", "Nintendo", ["Nintendo 3DS"], 3, "Mario Kart 7-min.jpg"));
    library.add(new Videogame("Mario Kart 8", ["carreras"], "Nintendo", "Nintendo", ["Wii U"], 3, "Mario Kart 8-min.jpg"));
}

start();