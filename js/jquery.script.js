// Para realizar operaciones en términos visuales utilizo JQuery ya que simplifica el código de JavaScript
// Solo se ejecuta cuando el documento (HTML) está preparado

$(function () {
    // ####################################################################################################################
    // Cambiar imagen de la portada
    $(function () {
        // Instanciar un objeto de la clase Array
        var images = new Array();

        // Añadir imágenes al array imágenes
        images[0] = "gow-min.jpg";
        images[1] = "tlou-min.jpg";
        images[2] = "mgsvtpp-min.jpg";
        images[3] = "thewitcher3-min.jpg";
        images[4] = "old-hunters-min.jpg";
        images[5] = "tlg-min.jpg";

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

            // Incrementar el índice
            i++;

            // En el caso de que el índice sea igual al tamaño del array, se le asigna el valor 0 para volver a empezar 
            if (i == images.length) {
                i = 0;
            }
        }, 8000);
    });

    // ####################################################################################################################
    // Hacer visible el menú de navegación en función de la posición vertical de la página web.
    // A partir del id = main-section-home del código html:
    //      - si se va hacia abajo el menú de navegación y la barra de búsqueda se hacen visibles, 
    //        además se fijará el menú de navegación en la parte de arriba
    //      - si se va hacia arriba el menú de navegación se hace trasparente y se oculta la barra de búsqueda,
    //        el menú de navegación no se fijará a la parte de arriba
    $('#main-section-home').waypoint(function (direction) {
        if (direction == "down") {
            $('nav').addClass('fixed-top');
            $('.navbar').removeClass('hide-navbar');
        } else {
            $('nav').removeClass('fixed-top');
            $('.navbar').addClass('hide-navbar');
        }
    }, {
        offset: '60px;'
    });

    // ####################################################################################################################
    // Al pulsar el botón cuya clase sea go-main-section-home la página se moverá hasta la etiqueta con id = main-section-home
    // con una animación que suavizará el proceso
    $('.go-main-section-home').click(function () {
        $('html, body').animate({
            scrollTop: $('#main-section-home').offset().top
        }, 500);
    });

    // ####################################################################################################################
    // Cambiar el icono al pulsar un botón dependiendo del último estado de éste
    $('.btn-expand').click(function () {
        if ($('.fa-caret-square-down').length) {
            $('#icon-expand').removeClass('fa-caret-square-down');
            $('#icon-expand').addClass('fa-caret-square-up');
        } else {
            $('#icon-expand').removeClass('fa-caret-square-up');
            $('#icon-expand').addClass('fa-caret-square-down');
        }
    });

    // ####################################################################################################################
    // Función para actualizar previsualización de imagen de forma dinámica
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#videogame-img').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#videogame-img-chooser").change(function () {
        readURL(this);
    });

    // ####################################################################################################################
    // Activar tooltip de Bootstrap
    $('[data-tooltip="tooltip"]').tooltip();
    // Mostrar tooltipe únicamente en el estado "hover", ocultar aunque el estado sea "focus"
    $('[data-tooltip="tooltip"]').on('focus', function () {
        $(this).tooltip('hide');
    });

    /*
    '<input class="custom-control-input" ' +
            'type="radio" ' +
            'id="onlineVideogame-' + videogame.ID + '" ' +
            'name="videogameType" ' +
            'value="multiplayer">' +
            '<label for="onlineVideogame-' + videogame.ID + '" class="custom-control-label">Multijugador Online</label>' +
            '</div>' +
    */

    // Habilitar/Deshabilitar campos del formulario de valoración
    $('input[value="single"]').click(function () {
        $('input[name="narrativeScore"').removeAttr('disabled');
        $('input[name="multiplayerScore"').attr('disabled', "");
    });

    $('input[value="multi"]').click(function () {
        $('input[name="narrativeScore"').attr('disabled', "");
        $('input[name="multiplayerScore"').removeAttr('disabled');
    });

    $('input[value="campaign/multi"]').click(function () {
        $('input[name="narrativeScore"').removeAttr('disabled');
        $('input[name="multiplayerScore"').removeAttr('disabled');
    });
});