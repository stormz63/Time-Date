netlifyIdentity.on('init', user => {
  const loginBtn = document.getElementById('login-btn');
  const logoutBtn = document.getElementById('logout-btn');
  const userGreeting = document.getElementById('user-greeting');

  if (user) {
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
    userGreeting.textContent = 'Logged in as ' + user.email;
  } else {
    loginBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
    userGreeting.textContent = '';
  }

  netlifyIdentity.on('login', () => {
    location.reload();
  });

  netlifyIdentity.on('logout', () => {
    location.reload();
  });
});

netlifyIdentity.init();

document.getElementById('login-btn').addEventListener('click', () => {
  netlifyIdentity.open('login');
});

document.getElementById('logout-btn').addEventListener('click', () => {
  netlifyIdentity.logout();
});
