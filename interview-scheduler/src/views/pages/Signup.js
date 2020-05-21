import { ServerPreifx } from "../../services/Config.js";
import SetUser from "../../services/SetUser.js";
import Redirect from "../../services/Redirect.js";
import GetUser from "../../services/GetUser.js";

let Signup = {
  name: "signup",
  render: async () => {
    let view = /*html*/`
      <div class="container form-wrapper">
        <form action="#" accept-charset="UTF-8" method="post">
          <div class="form-group">
            <label for="user_name">Name</label>
            <input class="form-control" type="text" name="user[name]" id="user_name">
          </div>
      
          <div class="form-group">
            <label for="user_email">Email</label>
            <input class="form-control" type="text" name="user[email]" id="user_email">
          </div>
      
          <div class="form-group">
            <label for="user_username">Username</label>
            <input class="form-control" type="text" name="user[username]" id="user_username">
          </div>
      
          <div class="form-group">
            <label for="user_password">Password</label>
            <input class="form-control" type="password" name="user[password]" id="user_password">
          </div>
      
          <div class="form-group">
            <label for="user_password_confirmation">Password confirmation</label>
            <input class="form-control" type="password" name="user[password_confirmation]" id="user_password_confirmation">
          </div>
      
          <div class="hidden">
            <label for="user_role_id">Role</label>
            <input class="form-control" value="1" type="text" name="user[role_id]" id="user_role_id">
          </div>
      
          <div class="hidden">
            <label for="user_role_token">Role token</label>
            <input class="form-control" value="0xffffffffff" type="text" name="user[role_token]" id="user_role_token">
          </div>
      
          <div class="actions">
            <input type="submit" name="commit" value="Signup" class="btn btn-primary btn-block" data-disable-with="Signup">
          </div>
      
          <div class="link-switch">
            <a class="btn btn-outline-dark btn-block" href="/#/login">Already have an account? Click here to login!</a>
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
      const url = `${ServerPreifx}/signup`;
      const data = $("form input").serialize();
      $.ajax({
        url: url,
        data: data,
        type: 'POST',
        success: async (data) => {
          if (data.success) {
            SetUser(data.user);
            await Redirect('/');
          }
          else {
            console.log(data.error);
          }
        }
      })
    });
  }
};

export default Signup;