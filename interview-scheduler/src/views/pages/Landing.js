let Landing = {
  name: "Landing",
  render: async () => {
    let view = /*html*/`
      <div class="container form-wrapper">
        <h1 class="center">Hello there!</h1>
        <div class="link-switch">
          <a class="btn btn-outline-primary btn-block" href="/#/signup"> Make an Account </a>
          <a class="btn btn-outline-success btn-block" href="/#/login"> Login </a>
        </div>
      </div>
    `
    return view;
  },
  postRender: async () => {

  }
}

export default Landing;