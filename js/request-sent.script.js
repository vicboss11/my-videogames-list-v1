// Se obtienen las variables name, email, type y message del Local Storage
var name = localStorage.getItem("name");
var email = localStorage.getItem("email");
var type = localStorage.getItem("type");
var message = localStorage.getItem("message");

// Se dibuja en el HTML asociado un mensaje personalizado con los datos obtenidos
document.getElementById('output').innerHTML = 'Estimado/a ' + name + ':' +
    '<br><br>' +
    'Tu consulta ha sido enviada correctamente y será atendida lo antes posible. ' +
    'Agradecemos tu colaboración y esperamos que sigas disfrutando de nuestros servicios.' +
    '<br><br>' +
    '<strong class="title">Email</strong> del emisor: ' + email +
    '<br>' +
    '<strong class="title">Tipo</strong> de consulta: ' + type +
    '<br>' +
    '<strong class="title">Consulta</strong>:' +
    '<div class="row"><div class="col-12 text-left">' + message + '</div></div>';
