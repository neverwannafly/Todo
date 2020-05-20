import Index from "./views/pages/Index.js";
import Signup from "./views/pages/Signup.js";
import Signin from "./views/pages/Signin.js";
import UserProfile from "./views/pages/UserProfile.js";
import UserInterview from "./views/pages/UserInterview.js";
import EditInterview from "./views/pages/EditInterview.js";

class Router {
  constructor() {
    this.routes = [{
      pattern: /^\/?$/i,
      view: Index
    }, {
      pattern: /^\/signup\/?$/i,
      view: Signup
    }, {
      pattern: /^\/login\/?$/i,
      view: Signin,
    }, {
      pattern: /^\/user\/\d+\/?$/i,
      view: UserProfile,
    }, {
      pattern: /^\/d+\/?$/i,
      view: UserInterview,
    }, {
      pattern: /^\/d+\/edit\/?$/i,
      view: EditInterview,
    }];
  }
  getUrl() {
    return location.hash.slice(1);
  }
  match() {
    let view = null;
    const url = this.getUrl();
    for (let route of this.routes) {
      if (route.pattern.test(url)) {
        view = route.view;
        break;
      }
    }
    return view;
  }
};

export default Router;