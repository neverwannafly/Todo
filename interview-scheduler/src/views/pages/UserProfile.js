import Navbar from "../components/Navbar.js";
import CreateInterview from "../components/CreateInterview.js";
import { ServerPreifx } from "../../services/Config.js";
import GetUser from "../../services/GetUser.js";

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
    const url =  location.href;
    const index = url.search('/user/') + 6;
    const ownerId = url.substring(index);
    const userData = GetUser();

    $.ajax({
      url: `${ServerPreifx}/user/${ownerId}`,
      data: {
        user_id: userData.userId,
        token: userData.token,
        resume_owner: ownerId,
      },
      type: 'GET',
      success: (data) => {
        if (data.success) {
          const resume = document.getElementById('resume-root');
          resume.innerHTML = /*html*/`<img src="${data.resume}">`;
        }
      }
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