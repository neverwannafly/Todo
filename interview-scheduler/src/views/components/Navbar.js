import GetUser from "../../services/GetUser.js";
import { ServerPreifx } from "../../services/Config.js";

let Navbar = {
  render: async () => {
    const userData = GetUser();
    let view = /*html*/`
    <nav class="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
      <strong>
        <a class="navbar-brand" href="/#/">Welcome ${userData.username}</a>
      </strong>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ml-auto">
          <a class="nav-item nav-link" data-toggle="modal" data-target="#createModal" href="">
            Create Interview
          </a>
          <a class="nav-item nav-link" href="/#/user/${userData.userId}">My Profile</a>
          <a class="nav-item nav-link" href="/#/${userData.userId}">My Interviews</a>
          <a class="nav-item nav-link" href="/#/landing" id="user-logout">Logout</a>
        </div>
      </div>
    </nav>
    `;
    return view
  },
  postRender: async () => {
    const logout = document.getElementById('user-logout');
    logout.addEventListener('click', async () => {
      const userData = GetUser();
      localStorage.clear();
      $.ajax({
        data: {
          user_id: userData.userId,
          token: userData.token,
        },
        url: `${ServerPreifx}/logout`,
        type: 'GET',
      });
    });
  }
}

export default Navbar;