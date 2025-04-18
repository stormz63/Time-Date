netlifyIdentity.init();

const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const logoutBtn = document.getElementById("logout-btn");
const userEmail = document.getElementById("user-email");

loginBtn.addEventListener("click", () => {
  netlifyIdentity.open("login");
});

signupBtn.addEventListener("click", () => {
  netlifyIdentity.open("signup");
});

logoutBtn.addEventListener("click", () => {
  netlifyIdentity.logout();
});

netlifyIdentity.on("login", user => {
  userEmail.textContent = `Logged in as: ${user.email}`;
  loginBtn.style.display = "none";
  signupBtn.style.display = "none";
  logoutBtn.style.display = "inline-block";
  netlifyIdentity.close();
});

netlifyIdentity.on("logout", () => {
  userEmail.textContent = "";
  loginBtn.style.display = "inline-block";
  signupBtn.style.display = "inline-block";
  logoutBtn.style.display = "none";
});

netlifyIdentity.on("init", user => {
  if (user) {
    userEmail.textContent = `Logged in as: ${user.email}`;
    loginBtn.style.display = "none";
    signupBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
  }
});
