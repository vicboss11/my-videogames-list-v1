// ####################################################################################################################
// ####################################################################################################################
// => FORMULARIOS

// ####################################################################################################################
// -> Validación

// Cuando el documento está cargado se llama a la función start()
window.onload = start();


function start() {
    // Al hacer click en el botón de enviar tendrá que llamar a la la función validar que
    // se encargará de validar el formulario
    document.getElementById("submit").addEventListener('click', validate, false);
}

// Función necesaria para validar el formulario
function validate(defaultEvent) {
    // Recibe por parámetro defaultEvent que gestionará el evento por defecto asociado al botón submit
    // que en este caso lo que hará es enviar el formulario
    // Se valida cada input con llamadas a sus funciones correspondientes
    if (validateText(this) && validateEmail() && validateTextArea())
        // Se envía el formulario devolviendo true
        return true;
    else {
        // Se cancela el evento de envío por defecto asignado al botón submit
        defaultEvent.preventDefault();
        // Se sale de la función devolviendo false
        return false;
    }
}

// Función para validar el texto
// Esta función recibe un objeto (En este caso es el botón submit)
function validateText(object) {
    // La propiedad form del botón submit contiene la referencia del formulario donde está ese botón submit
    var requestForm = object.form;

    // Recorremos todos los elementos del formulario, buscando los que son
    // de tipo texto para validar que no estén vacíos
    for (var i = 0; i < requestForm.elements.length; i++) {
        if (requestForm.elements[i].type == "text" && requestForm.elements[i].value == "") {
            requestForm.elements[i].focus();
            var error;

            if (requestForm.elements[i].name == "name") {
                error = "El campo \"Nombre\" no puede estar vacío";
            } else if (requestForm.elements[i].name == "email") {
                error = "El campo \"Email\" no puede estar vacío";
            }

            alert(error);

            return false;
        }
    }

    // Si sale de la función con true es que todos los campos de texto son correctos.
    return true;
}

// Función para validar el email mediante una expresión regular
function validateEmail() {
    var email = document.getElementById("email");

    // Expresión regular para validar email (W3C)
    var pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;

    if (pattern.test(email.value)) {

        return true;
    } else {
        // Situamos el foco en el campo matrícula y le asignamos la clase error.
        email.focus();
        alert("El formato del email no es válido");

        return false;
    }
}

// Función necesaria para validar que el campo de texto no esté vacío
function validateTextArea() {
    var textArea = document.getElementById('requestMessage');
    var requestMessage = textArea.value;

    if (/^\s*$/g.test(requestMessage) || requestMessage.indexOf('\n') != -1) {
        textArea.focus();

        alert("El campo de texto \"Consulta\" no puede estar vacío ni contener saltos de línea");

        return false;
    }

    return true;
}

// ####################################################################################################################
// -> Obtención de datos

// Función necesaria para enviar los datos del formulario una vez recogidos los datos
function sendRequest() {
    // Variable apuntando al formulario del que se quieren recoger los datos
    let requestForm = document.forms['request-form'];

    // Se obtiene el nombre
    let name = requestForm.name.value;

    // Se obtiene el email
    let email = requestForm.email.value;

    // Se obtiene el Array de los radio button requestType para recorrerlo mediante 
    // un bucle for y se guarda aquel que esté marcado en la variable type
    let requestArr = requestForm.requestType;

    for (let i = 0; i < requestArr.length; i++) {
        if (requestArr[i].checked) {
            var type = requestArr[i].value;
        }
    }

    // Se obtiene el mensaje de la consulta
    let message = requestForm.requestMessage.value;

    // Se almacenan los datos obtenidos en el Local Storage
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("type", type);
    localStorage.setItem("message", message);

    // Se abre una ventana con la resolución del formulario
    window.open("request-sent.html", "Consulta enviada con éxito", "width=700,height=450");
}