const socket = io();
let name;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message__area");

do {
  name = prompt("Enter your name : ");
} while (!name);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(message) {
  let msg = {
    user: name,
    message: message.trim(),
  };
  //Append the message on textarea
  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrollToBottom();

  //Send the message to server
  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>`;

  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

//Recive the message
socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrollToBottom();
});

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
