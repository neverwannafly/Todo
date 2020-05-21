import Navbar from "../components/Navbar.js";

let Error404 = {
  render : async () => {
    let view = /*html*/`
      <div id="navbar"></div>
      <div class="container">
        <div class="container center">
          <h1 class="display-1">Error 404</h1>
        </div>
      </div>
    `;
    return view;
  },
  postRender: async () => {
    const navbar = document.getElementById('navbar');
    navbar.innerHTML = await Navbar.render();
    await Navbar.postRender();
  }
}
export default Error404;