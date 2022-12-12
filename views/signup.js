async function signup(e) {
  try {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const password = e.target.password.value;
    const obj = {
      name: name,
      email: email,
      phone: phone,
      password: password,
    };
    console.log(obj);
    try {
      const user = await axios.post("http://localhost:8080/adduserdata", obj);
      console.log(user.name);
      document.body.innerHTML += `<div id="error" style="color: blue";>successfully Signed up please wait until it redirects</div>`;
      setTimeout(() => {
        window.location.href = "index.html";
        console.log("hello");
      }, 2000);

      e.target.name.value = "";
      e.target.email.value = "";
      e.target.phone.value = "";
      e.target.password.value = "";

      console.log(user);
    } catch (err) {
      const doc = document.body.innerHTML;
      document.body.innerHTML += `<div id="error" style="color: red";>${err} user Already found please try to login</div>`;
      setTimeout(() => {
        document.body.innerHTML = doc;
      }, 4000);
    }
  } catch (err) {
    document.body.innerHTML += `<div id="error" style="color: red";>${err}</div>`;
  }
}
