    netlifyIdentity.init();

    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const dashboard = document.getElementById("dashboard");

    loginBtn.addEventListener("click", () => {
      netlifyIdentity.open();
    });

    logoutBtn.addEventListener("click", () => {
      netlifyIdentity.logout();
    });

    netlifyIdentity.on("init", user => {
      updateUI(user);
    });

    netlifyIdentity.on("login", user => {
      netlifyIdentity.close();
      updateUI(user);
    });

    netlifyIdentity.on("logout", () => {
      updateUI(null);
    });

    function updateUI(user) {
      if (user) {
        dashboard.style.display = "block";
        logoutBtn.classList.remove("hidden");
        loginBtn.classList.add("hidden");
      } else {
        dashboard.style.display = "none";
        logoutBtn.classList.add("hidden");
        loginBtn.classList.remove("hidden");
      }
    }