const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
});

const user = {}

io.on('connection', socket=>{
    socket.on('new-user-joined', name => {
        console.log("new user joined naming", name);
        user[socket.id] = name
        socket.broadcast.emit('user-joined', name)
    })
    socket.on('send', message=>{
        socket.broadcast.emit('receive', {message: message, name: user[socket.id]})
    })
    socket.on('disconnect', message=>{
        socket.broadcast.emit('left', user[socket.id])
        delete user[socket.id]
    })
})