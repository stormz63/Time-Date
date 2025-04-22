
    netlifyIdentity.on('init', user => {
      updateUI(user)
    })

    netlifyIdentity.on('login', user => {
      updateUI(user)
      netlifyIdentity.close()

      if (window.location.hash == '#')
      {
        history.replaceState(null, '', window.location.pathname)
      }
    })

    netlifyIdentity.on('logout', () => {
      updateUI(null)
    })

    function updateUI(user) {
      const userInfo = document.getElementById('user-info')
      const adminPanel = document.getElementById('admin-panel')

      if (user) {
        const roles = user.app_metadata.roles || []
        const isAdmin = roles.includes('admin')

        userInfo.innerHTML = `
          <p>Welcome, <strong>${user.user_metadata.full_name || user.email}</strong></p>
          <button onclick="netlifyIdentity.logout()">Logout</button>
        `

        if (isAdmin) {
          adminPanel.style.display = 'block'
        } else {
          adminPanel.style.display = 'none'
        }
      } else {
        userInfo.innerHTML = ''
        adminPanel.style.display = 'none'
      }
    }

    netlifyIdentity.init()