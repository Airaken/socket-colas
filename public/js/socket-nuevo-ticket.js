//Comando para establecer la conexion

var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

socket.on('estadoActual', function(resp) {
    label.text(resp.estadoActual)
});


$('button').on('click', function() {
    // console.log('click');
    // metodo realizado por mi muestra mensaje en consola del navegador
    // socket.emit('siguienteTicket', function(resp) {
    //     console.log('respuesta server: ', resp);
    // });
    // metodo realizado por el profesor muestra mensaje en consola
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });
});