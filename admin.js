netlifyIdentity.on("init", user => {
  updateUI(user);
});

netlifyIdentity.on("login", user => {
  updateUI(user);
  netlifyIdentity.close();
  if (window.location.hash === "#") {
    history.replaceState(null, "", window.location.pathname);
  }
});

netlifyIdentity.on("logout", () => {
  updateUI(null);
});

document.getElementById("login-btn").addEventListener("click", () => {
  netlifyIdentity.open();
});

document.getElementById("logout-btn").addEventListener("click", () => {
  netlifyIdentity.logout();
});

function updateUI(user) {
  const greeting = document.getElementById("user-greeting");
  const loginBtn = document.getElementById("login-btn");
  const logoutBtn = document.getElementById("logout-btn");

  const isAdmin = user?.app_metadata?.roles?.includes("admin");

  if (user) {
    greeting.innerHTML = `Welcome, <strong>${user.user_metadata.full_name || user.email}</strong>`;

    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";

    if (isAdmin) {
      loadAdminPanel();
    }
  } else {
    greeting.innerHTML = "";
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
    hideAdminPanel();
  }
}

function loadAdminPanel() {
  const container = document.querySelector(".container");

  if (document.getElementById("admin-panel")) return;

  const adminPanel = document.createElement("div");
  adminPanel.id = "admin-panel";
  adminPanel.innerHTML = `
    <h3>Admin Panel</h3>
    <button onclick="fetchUsers()">View Users</button>
    <button onclick="viewAnalytics()">View Analytics</button>
    <button onclick="viewActivityLogs()">View Activity Logs</button>
    <div id="users-output" style="margin-top:1rem;"></div>
    <div id="analytics-output" style="margin-top:1rem;"></div>
    <div id="logs-output" style="margin-top:1rem;"></div>
  `;

  container.appendChild(adminPanel);
}

function hideAdminPanel() {
  const panel = document.getElementById("admin-panel");
  if (panel) panel.remove();
}

async function fetchUsers() {
  const output = document.getElementById("users-output");
  output.innerHTML = "Loading users...";

  const users = [
    { id: "123", email: "user1@example.com" },
    { id: "456", email: "user2@example.com" }
  ];

  output.innerHTML = users.map(user =>
    `<div>
      ${user.email}
      <button onclick="deleteUser('${user.id}')">Delete</button>
    </div>`
  ).join("");
}

async function deleteUser(userId) {
  if (!confirm("Are you sure you want to delete this user?")) return;

  alert(`User ${userId} deleted (mock response).`);
  fetchUsers();
}

async function viewAnalytics() {
  const output = document.getElementById("analytics-output");
  output.innerHTML = "Site Analytics (example only):<br><ul>" +
    "<li>Total visits: 1,234</li>" +
    "<li>Top page: /dashboard</li>" +
    "<li>Active users: 32</li>" +
    "</ul>";
}

async function viewActivityLogs() {
  const output = document.getElementById("logs-output");
  output.innerHTML = "Activity Logs (example):<br><ul>" +
    "<li>[10:23am] user1@example.com logged in</li>" +
    "<li>[10:25am] user2@example.com deleted a record</li>" +
    "</ul>";
}
