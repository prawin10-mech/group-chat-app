let chats = document.getElementById("add-chats");
let addGroups = document.getElementById("addGroups");
let userDetails = document.getElementById("users");
let availableUsers = document.getElementById("availableUsers");

const userName = localStorage.getItem("user");
const token = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", async () => {
  const groups = await axios.get("http://localhost:8080/getgroups");
  for (let i = 0; i < groups.data.groups.length; i++) {
    const data = groups.data.groups[i];
    const childNode = `<div><button id="groupButtons" onclick="getGroupChats(${data.id})">${data.groupName}</button></div>`;
    addGroups.innerHTML += childNode;
  }
  // const users = await axios.get("http://localhost:8080/getusers");
  // console.log(users.data);
  // for (let i = 0; i < users.data.length; i++) {
  //   const user = users.data[i];
  //   if (userName === user.name) {
  //     const childNode = `<div><h3>${user.name} *</h3></div>`;
  //     console.log(childNode);
  //     userDetails.innerHTML += childNode;
  //   } else {
  //     const childNode = `<div><h3>${user.name}</h3></div>`;
  //     console.log(childNode);
  //     userDetails.innerHTML += childNode;
  //   }
  // }
  // console.log(userDetails);
  // const userChats = await axios.get(`http://localhost:8080/getuserchats`);
  // for (let i = 0; i < userChats.data.length; i++) {
  //   const data = userChats.data[i];
  //   const name = data.name;
  //   const message = data.message;
  //   if (userName === name) {
  //     const childNode = `<div id="addedMessages">you: ${message}</div>`;
  //     chats.innerHTML += childNode;
  //   } else {
  //     const childNode = `<div >${name}: ${message}</div>`;
  //     chats.innerHTML += childNode;
  //   }
  // }
});

async function sendMessage(e) {
  e.preventDefault();
  const groupId = localStorage.getItem("groupId");
  console.log(groupId);
  const message = document.getElementById("message").value;
  const userChat = {
    user: userName,
    message: message,
    groupId,
  };
  console.log(userChat);
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

function logout() {
  localStorage.removeItem("user");
  window.location.href = "../index.html";
}

async function showCreateGroupBtn() {
  document.getElementById("groupName").style.visibility = "visible";
  document.getElementById("createBtn").style.visibility = "visible";
  const users = await getUsers();
}

async function createGroup() {
  const groupName = document.getElementById("groupName").value;
  const user = [];
  const userIds = [];

  for (var option of document.getElementById("selectUsers").options) {
    if (option.selected) {
      user.push(option.value.slice(0, -1));
      userIds.push(option.value.slice(-1));
    }
  }
  const obj = {
    groupName: groupName,
    user,
    userIds,
  };
  console.log(obj);
  localStorage.setItem(`${groupName}`, JSON.stringify(obj));
  if (groupName !== "") {
    const group = await axios.post(
      "http://localhost:8080/groups/addgroup",
      obj
    );

    console.log(group);
    const data = group.data;
    console.log(data);
    console.log(data.id);
    const childNode = `<div><button id="groupButtons" onclick="getGroupChats(${data.id})" >${groupName}</button></div>`;
    addGroups.innerHTML += childNode;
    document.getElementById("groupName").value = "";
    console.log(group);
  }
}

async function getUsers() {
  const users = await axios.get("http://localhost:8080/getusers");
  let childNode = document.createElement("select");
  childNode.setAttribute("multiple", "multiple");
  childNode.setAttribute("id", "selectUsers");
  for (let i = 0; i < users.data.length; i++) {
    const userName = users.data[i].name;
    const id = users.data[i].id;
    let a = document.createElement("option");

    a.setAttribute("id", `${id}`);
    a.setAttribute("value", `${userName}${id}`);
    a.innerText = `${userName}`;
    childNode.appendChild(a);
  }
  availableUsers.appendChild(childNode);
}

async function getGroupChats(id) {
  localStorage.setItem("groupId", id);
  userDetails.innerHTML = "<h2>USERS</h2>";
  const users = await axios.get(`http://localhost:8080/groups/users/${id}`);
  const userDetail = users.data.groupUser[0];
  let groupName = userDetail.groupName;
  let user = localStorage.getItem(`${groupName}`);
  user = JSON.parse(user).user;

  let flag = false;
  for (let i = 0; i < user.length; i++) {
    if (userName === user[i]) {
      flag = true;
    }
  }
  for (let i = 0; i < user.length; i++) {
    const details = user[i];
    if (userName === details) {
      const childNode = `<div><h3>${details} *</h3></div>`;
      userDetails.innerHTML += childNode;
    } else {
      const childNode = `<div><h3>${details}</h3></div>`;
      userDetails.innerHTML += childNode;
    }
  }
  chats.innerHTML = "";
  if (flag == true) {
    const groupChats = await axios.get(
      `http://localhost:8080/groups/userchats/${id}`
    );
    chats.innerHTML = "";
    for (let i = 0; i < groupChats.data.groupChat.length; i++) {
      const data = groupChats.data.groupChat[i];
      console.log(data);
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
  } else {
    const childNode = `<div id="addedMessages">You are not allowed to see the messages</div>`;
    chats.innerHTML += childNode;
  }
}
