"use strict";

import Router from "./Router.js";
import Error404 from "./views/pages/Error404.js";

let router = new Router();

const renderPage = async () => {
  let view = router.match();
  console.log(view);
  const root = document.getElementById('root');
  if (view != null) {
    root.innerHTML = await view.render();
    await view.postRender();
  } else {
    root.innerHTML = await Error404.render();
    await Error404.postRender();
  }
}

// Listen on hash change:
window.addEventListener('hashchange', renderPage);

// Listen on page load:
window.addEventListener('load', renderPage);
