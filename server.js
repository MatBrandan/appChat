const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IO } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IO(httpServer)

// Middleware

app.use(express.static('./public'))
const PORT = process.env.PORT || 8080

const messages = [
    {author: 'Pablo', text: 'Hola, como estas?'},
    {author: 'Luis', text: 'Hola!'},
    {author: 'Clara', text: 'Todo bien por suerte!'}
]
// Implementación del Socket

io.on('connection', socket=>{
    console.log('Nuevo cliente conectado');

    // Cargar historial de chat cada vez que un cliente se conecte 
    socket.emit('message', messages)

    // Escuchamos al cliente a traves del metodo socket.on
    socket.on('new-message', data =>{
        messages.push(data)

        // Reenviamos el chat log a todos los clientes para renderizarlo con io.sockets.emit
        io.sockets.emit('message', messages)
    })

})


httpServer.listen(PORT, () =>{
    console.log(`Server Ok en ${PORT}`);
})
