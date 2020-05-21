import Navbar from "../components/Navbar.js";
import CreateInterview from "../components/CreateInterview.js";
import { ServerPreifx } from "../../services/Config.js";
import GetUser from "../../services/GetUser.js";
import Redirect from "../../services/Redirect.js";

let UserProfile = {
  name: "UserProfile",
  render: async () => {
    let view = /*html*/`
    <div id="navbar-root"></div>
    <div id="create-interview-root"></div>
    <div class="container">
      <div class="center">
        <div id="resume-root"></div>
      </div>
      <div class="center">
        <form id="upload_resume" action="#" accept-charset="UTF-8" method="post">
          <div class="form-group form-inline">
            <label for="user_resume"><h3>Resume</h3></label>
            <input class="form-control-file" type="file" name="interview[resume]" id="user_resume">
          </div>
              
          <div class="actions form-group form-inline">
            <input type="submit" name="commit" value="Upload" class="btn btn-primary btn-block">
          </div>
        </form>
      </div>
    </div>
    `;
    return view;
  },
  postRender: async () => {
    const resume = document.getElementById('resume-root');
    const path =  location.href;
    const index = path.search('/user/') + 6;
    const ownerId = path.substring(index);
    const userData = GetUser();
    const url = `${ServerPreifx}/user/${ownerId}`;

    $.ajax({
      url: url,
      data: {
        user_id: userData.userId,
        token: userData.token,
        resume_owner: ownerId,
      },
      type: 'GET',
      success: (data) => {
        if (data.success) {
          resume.innerHTML = /*html*/`<iframe class="image" src="${data.resume}" frameborder="0"></iframe>`;
        } else {
          resume.innerHTML = /*html*/`Resume not found`;
        }
      }
    });

    const form =  document.getElementById('upload_resume');
    form.addEventListener('submit', event => {
      event.preventDefault();
      const file = document.getElementById('user_resume').files[0];
      const userData = GetUser();
      let formData = new FormData();
      formData.append('resume',   file)
      formData.append('owner_id', ownerId)
      formData.append('user_id',  userData.userId)
      formData.append('token',    userData.token)
      $.ajax({
        url: url,
        data: formData,
        type: 'PATCH',
        processData: false,
        contentType: false,
        success: async (data) => {
          if (data.success) {
            await Redirect(location.hash.slice(1));
          } else {
            console.log(data.error);
          }
        },
      });
    });

    const navbar = document.getElementById('navbar-root');
    navbar.innerHTML = await Navbar.render();
    await Navbar.postRender();

    const createInterview = document.getElementById('create-interview-root');
    createInterview.innerHTML = await CreateInterview.render();
    await CreateInterview.postRender();

  }
};

export default UserProfile;