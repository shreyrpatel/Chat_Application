//const e = require("cors");

const socket= io('http://localhost:8000');

//get DOM elements in respective Js variable 
const form= document.getElementById('send-container');
const messageInput= document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

//Audio that will play on receiving message
var audio= new Audio('sound.mp3');

// function which will append event info to the container
const append = (message,position)=>{
const messageElement = document.createElement('div');
messageElement.innerText = message;
messageElement.classList.add('message');
messageElement.classList.add(position);
 messageContainer.append(messageElement);
if(position== 'left')
{
     audio.play();
} 
    
}

//if form get submitted send message to the server
form.addEventListener('submit',(e)=>{
    e.preventDefault();  //so that page does not get reload
    const message= messageInput.value ; //we are getting the message and storing the message
    append(`You : ${message}`,'right')  //display the message in sender side
    socket.emit('send',message);
    messageInput.value= ''; // to empty input box after sending it

}); 

// Ask new user for his/her name and let the server know
const username= prompt("Enter your name to join");
socket.emit('new-user-joined',username);

// if a new user join, receive his/her name from server
socket.on('user-joined',data=>{
    append(`${data} joined the chat`, 'right');
});

// if server sends a message, receive it
socket.on('receive',data=>{
    append(`${data.username}: ${data.message}`, 'left');
});

// if a user leave a chat, append the info to the container
 socket.on('leave',name=>{
    append(`${name} left the chat`, 'right');
}); 











