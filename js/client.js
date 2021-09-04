const socket = io('https://chat-app-node-js-dusky.vercel.app/')

const ting = new Audio('../ting.mp3')
const join = new Audio('../join.mp3')
const leave = new Audio('../leave.mp3')

const form = document.getElementById('send-con')
const message = document.getElementById('text')
const messageContainer = document.querySelector('.container')

const appendJoin = (message)=>{
    const messEle = document.createElement('div')
    messEle.classList.add('joinLeave')
    messEle.innerHTML = `<span><b>${message}</b> joined the chat</span>`
    messageContainer.append(messEle)
}
const appendLeave = (message)=>{
    const messEle = document.createElement('div')
    messEle.classList.add('joinLeave')
    messEle.innerHTML = `<span><b>${message}</b> left the chat</span>`
    messageContainer.append(messEle)
}
const appendMess = (name, mess, pos)=>{
    const messEle = document.createElement('div')
    messEle.classList.add('messages')
    messEle.classList.add(pos)

    const messMem = document.createElement('div')
    messMem.classList.add('member')
    messMem.innerText = name
    
    const messMes = document.createElement('div')
    messMes.classList.add('message')
    messMes.innerText = mess

    messEle.append(messMem)
    messEle.append(messMes)

    messageContainer.append(messEle)
}

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const mess = message.value
    message.value = ''
    appendMess("You", mess, 'right')
    socket.emit('send', mess)
})

const nameK = prompt('Enter your name to join: ')
socket.emit('new-user-joined', nameK)

socket.on('user-joined', data => {
    appendJoin(data)
    join.play()
})
socket.on('receive', data => {
    appendMess(data.name, data.message, 'left')
    ting.play()
})
socket.on('left', data => {
    appendLeave(data)
    leave.play()
})
