let Navbar = {
  render: async () => {
    let view = /*html*/`
    <nav class="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
      <strong>
        <a class="navbar-brand" href="/interviews">Welcome neverwannafly</a>
      </strong>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ml-auto">
          <a class="nav-item nav-link" data-toggle="modal" data-target="#createModal" href="">
            Create Interview
          </a>
          <a class="nav-item nav-link" href="/user/1">My Profile</a>
          <a class="nav-item nav-link" href="/interviews/1">My Interviews</a>
          <a class="nav-item nav-link" href="/logout">Logout</a>
        </div>
      </div>
    </nav>
    `;
    return view
  },
  after_render: async () => {

  }
}

export default Navbar;