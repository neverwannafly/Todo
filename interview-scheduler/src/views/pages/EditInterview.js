import Navbar from "../components/Navbar.js";
import CreateInterview from "../components/CreateInterview.js";
import Autocomplete from "../../services/Autocomplete.js";
import ExtractId from "../../services/ExtractId.js";
import { ServerPreifx } from "../../services/Config.js";
import GetUser from "../../services/GetUser.js";
import Redirect from "../../services/Redirect.js";

let EditInterview = {
  name: "EditInterview",
  render: async () => {
    let view = /*html*/`
    <div id="navbar-root"></div>
    <div id="create-interview-root"></div>
      <div class="container">
        <div class="wrapper">
          <form id="edit_interview" action="#" accept-charset="UTF-8" method="post">
            
            <div class="form-group">
              <label for="edit_interview_title">Title</label>
              <input class="form-control" type="text" name="interview[title]" id="edit_interview_title">
            </div>
          
            <div class="form-group">
              <label for="edit_interview_agenda">Agenda</label>
              <input class="form-control" type="text" name="interview[agenda]" id="edit_interview_agenda">
            </div>
          
            <div class="form-group">
              <label for="edit_interview_members">Members</label>
              <input id="edit-find-users" type="text" name="interview[members]">
            </div>
          
            <div class="form-group">
              <label for="edit_dtp_beg">Start</label>
              <input class="form-control" id="edit_dtp_beg" type="datetime-local" name="interview[start]">
            </div>
          
            <div class="form-group">
              <label for="edit_dtp_end">End</label>
              <input class="form-control" id="edit_dtp_end" type="datetime-local" name="interview[end]">
            </div>
          
            <div class="form-group">
              <label for="edit_interview_comments">Comments</label>
              <textarea class="form-control" name="interview[comments]" id="edit_interview_comments"></textarea>
            </div>
          
            <div class="actions">
              <input type="submit" name="commit" value="Update" class="btn btn-danger btn-block">
            </div>
          
          </form>
        </div>
      </div>
    `;
    return view;
  },
  postRender: async () => {
    const navbar = document.getElementById('navbar-root');
    const createInterview = document.getElementById('create-interview-root');
    const interviewId = ExtractId(2);
    const userData = GetUser();
    const url = `${ServerPreifx}/api/interviews/get/${interviewId}`;

    // Fill in default form values.
    $.ajax({
      url: url,
      data: {
        user_id: userData.userId,
        token: userData.token,
      },
      type: 'GET',
      success: function(data) {
        console.log(data);
        $("#edit_interview_title").val(data.title);
        $("#edit_interview_agenda").val(data.agenda);
        $("#edit-find-users").val(data.members);
        $("#edit_dtp_beg").val(data.start.split('+')[0]);
        $("#edit_dtp_end").val(data.end.split('+')[0]);
        $("#edit_interview_comments").val(data.comments);
        // make #edit-find-users an autocomplete field
        Autocomplete('edit-find-users');
      }
    });

    const form = document.getElementById('edit_interview');
    form.addEventListener('submit', event => {
      event.preventDefault();
      const url = `${ServerPreifx}/interviews/${interviewId}`;
      const userData = GetUser();
      $.ajax({
        url: url,
        data: {
          user_id: userData.userId,
          token: userData.token,
          interview: {
            title: $("#edit_interview_title").val(),
            agenda: $("#edit_interview_agenda").val(),
            members: $("#edit-find-users").val(),
            start: $("#edit_dtp_beg").val(),
            end: $("#edit_dtp_end").val(),
            comments: $("#edit_interview_comments").val(),
          },
        },
        type: "PATCH",
        success: async data => {
          console.log(data);
          await Redirect('/');
        }
      });
    });

    navbar.innerHTML = await Navbar.render();
    await Navbar.postRender();

    createInterview.innerHTML = await CreateInterview.render();
    await CreateInterview.postRender();

  }
};

export default EditInterview;