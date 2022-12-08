async function loginUser(e) {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  const userLogin = {
    email: email,
    password: password,
  };
  const user = await axios.post(
    "http://localhost:8080/postloginuser",
    userLogin
  );
  const body = document.body.innerHTML;
  document.body.innerHTML += `<div id="error" style="color: papayawhip"; font-size="2rem";>${user.data.message}</div>`;
  localStorage.setItem("token", user.data.token);
  setTimeout(() => {
    if (user.data.success) {
      window.location.href = "./chatScreen/mainscreen.html";
    }
  }, 2000);
  setTimeout(() => {
    document.body.innerHTML = body;
  }, 3000);
}
