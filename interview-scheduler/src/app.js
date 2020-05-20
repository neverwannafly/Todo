"use strict";

import Index        from './views/pages/Index.js';
import About        from './views/pages/About.js'
import Error404     from './views/pages/Error404.js'
import PostShow     from './views/pages/PostShow.js'
import Register     from './views/pages/Register.js'

import Navbar       from './views/components/Navbar.js'
import CreateInterviewModal from "./views/components/CreateInterviewModal.js";

import Utils        from './services/Utils.js'

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
    '/'           : Index,
    '/about'      : About,
    '/p/:id'      : PostShow,
    '/register'   : Register,
};


// The router code. Takes a URLchecks against the list of supported routes and then renders the corresponding content page.
const router = async () => {

    // Lazy load view element:
    const header = null || document.getElementById('header_container');
    const content = null || document.getElementById('page_container');
    const modal = null || document.getElementById('page_modal');
    
    // Render the Header and footer of the page
    header.innerHTML = await Navbar.render(); await Navbar.after_render();
    modal.innerHTML = await CreateInterviewModal.render(); await CreateInterviewModal.after_render();

    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL()

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    
    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    content.innerHTML = await page.render();
    await page.after_render();
  
}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);
