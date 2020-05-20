let Signup = {
  render: async () => {
    let view = `
      <div class="container form-wrapper">
        <form action="/signup" accept-charset="UTF-8" method="post"><input type="hidden" name="authenticity_token" value="kGUFz1hensP+/8cEEuU9jR6cYDnUw+NzR5b8oHFbh39n36UbFLPQSqvC7ZoxcAXgzn8UXEfebxkProXuZSQHFg==">
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
            <a class="btn btn-outline-dark btn-block" href="/login">Already have an account? Click here to login!</a>
          </div>
        </form>
      </div>
    `;
  },
  after_render: async () => {

  }
};

export default Signup;