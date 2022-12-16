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
  console.log(message.length);
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
  const createdBy = [];
  createdBy.push(userName);

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
    createdBy,
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
  userDetails.innerHTML += `<button onclick="editUsersInGroup(${id})">Edit group</button>`;
  const users = await axios.get(`http://localhost:8080/groups/users/${id}`);
  const userDetail = users.data.groupUser[0];
  let groupName = userDetail.groupName;
  let user = localStorage.getItem(`${groupName}`);
  let localCreatedBy = JSON.parse(user).createdBy;
  user = JSON.parse(user).user;

  let flag = false;
  for (let i = 0; i < user.length; i++) {
    if (userName === user[i]) {
      flag = true;
    }
  }
  for (let i = 0; i < user.length; i++) {
    const details = user[i];
    let flag = false;
    for (let j = 0; j < localCreatedBy.length; j++) {
      if (localCreatedBy[j] === details) {
        flag = true;

        break;
      }
    }
    if (flag == true) {
      const childNode = `<div><h3>${details}  <i class="fa-solid fa-crown"></i></h3></div>`;
      userDetails.innerHTML += childNode;
    } else {
      const childNode = `<div><h3>${details}</h3></div>`;
      userDetails.innerHTML += childNode;
    }
    console.log(flag);
  }
  chats.innerHTML = "";
  if (flag == true) {
    const sendBtn = document.getElementById("send");
    sendBtn.disabled = false;
    sendBtn.style.cursor = "pointer";
    const groupChats = await axios.get(
      `http://localhost:8080/groups/userchats/${id}`
    );
    chats.innerHTML = "";
    for (let i = 0; i < groupChats.data.groupChat.length; i++) {
      const data = groupChats.data.groupChat[i];
      const name = data.name;
      const message = data.message;

      if (userName === name) {
        if (message.length > 50) {
          const childNode = `<div>you: <img src="../images/imageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.jpg"></div>`;
          chats.innerHTML += childNode;
        } else {
          const childNode = `<div id="addedMessages">you: ${message}</div>`;
          chats.innerHTML += childNode;
        }
      } else {
        if (message.length > 50) {
          const childNode = `<div>${name}: <img src="${message}"></div>`;
          chats.innerHTML += childNode;
        } else {
          const childNode = `<div >${name}: ${message}</div>`;
          chats.innerHTML += childNode;
        }
      }
    }
  } else {
    const childNode = `<div id="addedMessages">You are not allowed to see the messages</div>`;
    const sendBtn = document.getElementById("send");
    if (sendBtn) {
      sendBtn.disabled = true;
      sendBtn.style.cursor = "not-allowed";
    }

    chats.innerHTML += childNode;
  }
}

async function editUsersInGroup(groupId) {
  const groupUsers = await axios.get(
    `http://localhost:8080/groups/getusers/${groupId}`
  );
  const groupName = groupUsers.data.group[0].groupName;
  let users = localStorage.getItem(`${groupName}`);
  users = JSON.parse(users);
  console.log(users);
  let localCreatedBy = users.createdBy;
  userDetails.innerHTML = "<h2>REMOVE USERS</h2>";
  let childNode = document.createElement("select");
  childNode.setAttribute("multiple", "multiple");
  childNode.setAttribute("id", "removeUsers");

  for (let i = 0; i < users.user.length; i++) {
    const userName = users.user[i];
    const id = users.userIds[i];

    let a = document.createElement("option");
    a.setAttribute("id", `${id}`);
    a.setAttribute("value", `${userName}${id}`);
    a.innerText = `${userName}`;
    childNode.appendChild(a);
  }
  for (let i = 0; i < localCreatedBy.length; i++) {
    userDetails.appendChild(childNode);
    if (userName === localCreatedBy[i]) {
      const removeBtn = document.createElement("button");
      removeBtn.setAttribute("id", "removeUsersBtn");
      removeBtn.setAttribute("onclick", `removeUserFromGroup(${groupId})`);
      removeBtn.innerText = "REMOVE";
      userDetails.appendChild(removeBtn);
      console.log(removeBtn);

      const adminBtn = document.createElement("button");
      adminBtn.setAttribute("id", "adminBtn");
      adminBtn.setAttribute("onclick", `makeAdminForGroup(event)`);
      adminBtn.innerText = "MAKE ADMIN";
      userDetails.appendChild(adminBtn);

      const addBtn = document.createElement("button");
      addBtn.setAttribute("id", "addUsersBtn");
      addBtn.setAttribute("onclick", `addUserToGroup(${groupId})`);
      addBtn.innerText = "ADD USER";
      userDetails.appendChild(addBtn);
    } else {
      console.log(userDetails);
    }
  }
}

async function removeUserFromGroup(groupId) {
  const groupname = await axios.get(
    `http://localhost:8080/groups/groupname/${groupId}`
  );
  const groupName = groupname.data[0].groupName;
  let groupuserdetails = localStorage.getItem(`${groupName}`);
  groupuserdetails = JSON.parse(groupuserdetails);

  const user = groupuserdetails.user;
  const userIds = groupuserdetails.userIds;
  const createdBy = groupuserdetails.createdBy;
  for (var option of document.getElementById("removeUsers").options) {
    if (option.selected) {
      let userId = option.value.slice(-1);
      user.pop(option.value.slice(0, -1));
      userIds.pop(option.value.slice(-1));
      const removeUser = await axios.get(
        `http://localhost:8080/groups/removeuser?userId=${userId}&groupId=${groupId}`
      );
      console.log(removeUser);
    }
  }
  const obj = {
    groupName,
    user,
    userIds,
    createdBy,
  };
  console.log(obj);
  localStorage.setItem(`${groupName}`, JSON.stringify(obj));
}

async function addUserToGroup(groupId) {
  console.log("user added", groupId);
  let users = await axios.get(`http://localhost:8080/groups/addusers`);
  users = users.data;
  userDetails.innerHTML = "<h2>ADD USERS</h2>";
  let label = document.createElement("label");
  label.setAttribute("for", "addUsers");
  label.innerText = "UserName:  ";
  let childNode = `<form onsubmit="adduserToGroups(event)">
                      <label for="addUsers">UserName</label>
                      <input id="UserName" type="text" placeholder="enter username" />
                      <button>Add</button>
                      </form>`;
  userDetails.innerHTML += childNode;
}

async function adduserToGroups(e) {
  e.preventDefault();
  const groupId = localStorage.getItem("groupId");
  const groupname = await axios.get(
    `http://localhost:8080/groups/groupname/${groupId}`
  );
  const groupName = groupname.data[0].groupName;
  let groupuserdetails = localStorage.getItem(`${groupName}`);
  groupuserdetails = JSON.parse(groupuserdetails);

  const user = groupuserdetails.user;
  const userIds = groupuserdetails.userIds;
  const name = e.target.UserName.value;
  const createdBy = groupuserdetails.createdBy;
  let groupuser = await axios.get(
    `http://localhost:8080/groups/addusertogroup/${name}`
  );
  groupuser = groupuser.data[0];
  const userName = groupuser.name;
  const userId = groupuser.id;

  user.push(userName);
  userIds.push(userId);

  const addUser = await axios.get(
    `http://localhost:8080/groups/adduser?userId=${userId}&groupId=${groupId}`
  );
  console.log(addUser);

  const obj = {
    groupName,
    user,
    userIds,
    createdBy,
  };
  console.log(obj);
  localStorage.setItem(`${groupName}`, JSON.stringify(obj));
  setTimeout(() => {
    window.location.reload();
  }, 1000);
}

async function makeAdminForGroup(e) {
  e.preventDefault();
  userDetails.innerHTML = "<h2>MAKE ADMIN</h2>";
  let childNode = `<form onsubmit="MakeAdminToGroups(event)">
                      <label for="makeAdmin">Admin: </label>
                      <input id="makeAdmin" type="text" placeholder="enter username" />
                      <button>Make admin</button>
                      </form>`;
  userDetails.innerHTML += childNode;
}

async function MakeAdminToGroups(e) {
  e.preventDefault();
  let groupId = localStorage.getItem(`groupId`);
  const groupname = await axios.get(
    `http://localhost:8080/groups/groupname/${groupId}`
  );
  const groupName = groupname.data[0].groupName;
  let groupuserdetails = localStorage.getItem(`${groupName}`);

  groupuserdetails = JSON.parse(groupuserdetails);

  const user = groupuserdetails.user;
  const userIds = groupuserdetails.userIds;
  const createdBy = groupuserdetails.createdBy;

  const adminUser = document.getElementById("makeAdmin").value;
  createdBy.push(adminUser);
  console.log(adminUser);
  console.log(createdBy);
  const obj = {
    groupName,
    groupId,
    createdBy,
    user,
    userIds,
  };
  localStorage.setItem(`${groupName}`, JSON.stringify(obj));
  setTimeout(() => {
    window.location.reload();
  }, 1000);
}

async function sendImage(e) {
  e.preventDefault();
  const groupId = localStorage.getItem("groupId");
  const url =
    "../images/imageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.jpg";

  const userChat = {
    user: userName,
    message: url,
    groupId,
  };
  const user = await axios.post(
    "http://localhost:8080/chats/userschat",
    userChat,
    {
      headers: { Authorization: token },
    }
  );

  const childNode = `<div>you: <img src="../images/imageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.jpg"></div>`;
  console.log(childNode);
  chats.innerHTML += childNode;
}
