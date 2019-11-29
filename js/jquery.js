// Para realizar operaciones en términos visuales utilizo JQuery ya que simplifica el código de JavaScript

// Cambiar imagen de la portada
$(function () {
    // Instanciar un objeto de la clase Array
    var images = new Array();

    // Añadir imágenes al array imágenes
    images[0] = "gow-min.jpg";
    images[1] = "tlou-min.jpg";
    images[2] = "botw-min.jpg";
    images[3] = "mgsvtpp-min.jpg";
    images[4] = "thewitcher3-min.jpg";
    images[5] = "old-hunters-min.jpg";
    images[6] = "tlg-min.jpg";

    // Variable "i" que actuará como índice del array para establecer la imagen de portada 
    var i = 0;

    // Función "setInterval" con una función anónima en la cuál se establece la imágen de la portada.
    // Después establece su duración
    setInterval(function () {
        $(".bg-image").css({
            "background-image": "-o-linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(images/header/" + images[i] + ")",
            "background-image": "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(images/header/" + images[i] + ")",
            "background-image": "-webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0.7)), to(rgba(0, 0, 0, 0.7))), url(images/header/" + images[i] + ")"
        });

        $(".bg-image").fadeIn("slow");

        // Incrementar el índice
        i++;

        // En el caso de que el índice sea igual al tamaño del array, se le asigna el valor 0 para volver a empezar 
        if (i == images.length) {
            i = 0;
        }
    }, 8000);
});

// Hacer visible el menú de navegación en función de la posición vertical de la página web.
// A partir del id = main-section del código html:
//      - si se va hacia abajo el menú de navegación y la barra de búsqueda se hacen visibles, 
//        además se fijará el menú de navegación en la parte de arriba
//      - si se va hacia arriba el menú de navegación se hace trasparente y se oculta la barra de búsqueda,
//        el menú de navegación no se fijará a la parte de arriba
$('#main-section').waypoint(function (direction) {
    if (direction == "down") {
        $('nav').addClass('fixed-top');
        $('.navbar').removeClass('hide-navbar');
        $('.search-navbar').removeClass('hide-search-navbar');
    } else {
        $('nav').removeClass('fixed-top');
        $('.navbar').addClass('hide-navbar');
        $('.search-navbar').addClass('hide-search-navbar');
    }
}, {
    offset: '60px;'
});

// Al pulsar el botón cuya clase sea go-main-section la página se moverá hasta la etiqueta con id = main-section
// con una animación que suavizará el proceso
$('.go-main-section').click(function () {
    $('html, body').animate({
        scrollTop: $('#main-section').offset().top
    }, 500);
});

$('.btn-expand').click(function () {
    if ($('.fa-caret-square-down').length) {
        $('#icon-expand').removeClass('fa-caret-square-down');
        $('#icon-expand').addClass('fa-caret-square-up');
    } else {
        $('#icon-expand').removeClass('fa-caret-square-up');
        $('#icon-expand').addClass('fa-caret-square-down');
    }
});