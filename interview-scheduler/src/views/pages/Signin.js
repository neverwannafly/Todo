let Signin = {
  name: "Signin",
  render: async () => {
    let view = /*html*/`
      <div class="container form-wrapper">
    
        <form action="/login" accept-charset="UTF-8" method="post"><input type="hidden" name="authenticity_token" value="Ybj8ncVwDtkFZrEw+WPHzSj5mKimxmdGEgTR525YSGgglePz75pIZN9VTs7YnCAs7aswKHY2X6BtdYD1QuPulg==">
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

  }
}

export default Signin;