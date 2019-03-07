const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    // metodo realizado por mi muestra mensaje en consola de navegador
    // client.on('siguienteTicket', (callback) => {
    //     console.log('Cual es el siguinete ticket');
    //     client.emit('siguienteTicket', callback(ticketControl.siguiente()));
    // });

    //metodo realizado por el profesor muestra mensaje en consola
    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        callback(siguiente);
    });
    // emitir un evento estadoActual 
    client.emit('estadoActual', {
        estadoActual: ticketControl.getUltimo(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'escritorio necesario'
            })
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        console.log(atenderTicket);
        callback(atenderTicket);
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });

        //actualizar o notificar cambios en los ultimos 4
    });







    // console.log('Usuario conectado');

    // client.emit('enviarMensaje', {
    //     usuario: 'Administrador',
    //     mensaje: 'Bienvenido a esta aplicación'
    // });



    // client.on('disconnect', () => {
    //     console.log('Usuario desconectado');
    // });

    // // Escuchar el cliente
    // client.on('enviarMensaje', (data, callback) => {

    //     console.log(data);

    //     client.broadcast.emit('enviarMensaje', data);


    // if (mensaje.usuario) {
    //     callback({
    //         resp: 'TODO SALIO BIEN!'
    //     });

    // } else {
    //     callback({
    //         resp: 'TODO SALIO MAL!!!!!!!!'
    //     });
    // }



    // });

});