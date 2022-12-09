let chats = document.getElementById("add-chats");

const userName = localStorage.getItem("user");
const token = localStorage.getItem("token");

let userDetails = document.getElementsByClassName("users");
document.addEventListener("DOMContentLoaded", async () => {
  const users = await axios.get("http://localhost:8080/getusers");
  console.log(users.data);
  for (let i = 0; i < users.data.length; i++) {
    const user = users.data[i];
    const childNode = `<div>${user.name}</div>`;
    userDetails.innerHTML += childNode;
  }
  console.log(userDetails);
  const userChats = await axios.get("http://localhost:8080/getuserchats");
  for (let i = 0; i < userChats.data.length; i++) {
    const data = userChats.data[i];
    const name = data.name;
    const message = data.message;
    if (userName === name) {
      const childNode = `<div id="addedMessages">you: ${message}</div>`;
      chats.innerHTML += childNode;
    } else {
      const childNode = `<div >${name}: ${message}</div>`;
      chats.innerHTML += childNode;
    }
  }
});

async function sendMessage(e) {
  e.preventDefault();
  const message = document.getElementById("message").value;
  const userChat = {
    user: userName,
    message: message,
  };
  const user = await axios.post(
    "http://localhost:8080/chats/userschat",
    userChat,
    {
      headers: { Authorization: token },
    }
  );
  console.log(user);

  const childNode = `<div>you: ${message}</div>`;
  chats.innerHTML += childNode;
  document.getElementById("message").value = "";
}

function sendNewUser(user) {
  const childNode = `<div>you: ${user} joined </div>`;
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "../login.html";
}
