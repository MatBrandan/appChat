// Primer paso, Establecer comunicacion lado cliente
const socket = io.connect()

// Armamos nuestra funcion de render
function render(data){
    const html = data.map(item =>{
        return(`<div><strong>${item.author}</strong>: <em>${item.text}</em></div>`)
    }).join(' ')

    document.getElementById('message').innerHTML= html
}

// Funcion para enviar mensajes al hacer submit

function addMessage(){
    const authorName = document.getElementById('author').value
    const textMsn = document.getElementById('text').value

    const mensaje = {
        author: authorName,
        text: textMsn
    }
    document.getElementById('text').value = ''
    // Enviamos el mensaje al server con el metodo emit
    socket.emit('new-message', mensaje)

    return false
}



//  Implementamos los eventos de escucha y envio de datos
// Envio con metodo emit, recibir con metodo on
socket.on('message', data =>{
    render(data)
}) 