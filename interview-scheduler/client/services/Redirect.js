import router from "./Router.js";

let Redirect = async (path) => {
  let view = router.match(path);
  const root = document.getElementById('root');
  if (view === null) {
    throw new Error("Invalid Path");
  }
  location.hash = path;
  root.innerHTML = await view.render();
  await view.postRender();
}

export default Redirect;