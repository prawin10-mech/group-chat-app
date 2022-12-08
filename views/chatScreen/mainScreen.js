const chats = document.getElementById("add-chats");

function sendMessage(e) {
  e.preventDefault();
  const message = document.getElementById("message").value;
  const childNode = `<div>name: ${message}</div>`;
  chats.innerHTML += childNode;
  document.getElementById("message").value = "";
}
