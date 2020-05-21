import { ServerPreifx, RED_NOTICE, BLUE_NOTICE } from "../../services/Config.js";
import SetUser from "../../services/SetUser.js";
import Redirect from "../../services/Redirect.js";
import IssueNotice from "../../services/IssueNotice.js";
import GetUser from "../../services/GetUser.js";

let Signin = {
  name: "Signin",
  render: async () => {
    let view = /*html*/`
      <div class="wrapper">
        <div id="notice-root"></div>
      </div>
      <div class="container form-wrapper">
    
        <form action="#" accept-charset="UTF-8" method="post">
          <div class="form-group">
            <label for="email">Email</label>
            <input class="form-control" type="text" name="email" id="email">
          </div>
      
          <div class="form-group">
            <label for="password">Password</label>
            <input class="form-control" type="password" name="password" id="password">
          </div>
      
          <div class="actions">
            <input type="submit" name="commit" value="Login" class="btn btn-primary btn-block" data-disable-with="Login">
          </div>
      
          <div class="link-switch">
            <a class="btn btn-outline-dark btn-block" href="/#/signup">New User? Create an account to continue!</a>
          </div>
        </form>
      </div>
    `;
    return view;
  },
  postRender: async () => {
    const form = document.getElementsByTagName('form')[0];
    form.addEventListener('submit', event => {
      event.preventDefault();
      const url = `${ServerPreifx}/login`;
      const data = $("form input").serialize();
      $.ajax({
        url: url,
        data: data,
        type: 'POST',
        success: async (data) => {
          if (data.success) {
            SetUser(data.user);
            await Redirect('/');
            await IssueNotice(`Welcome back ${GetUser().username}!`, BLUE_NOTICE);
          }
          else {
            await IssueNotice(data.error, RED_NOTICE);
          }
        }
      });
    });
  }
}

export default Signin;