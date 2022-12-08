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
  console.log(user);
}
