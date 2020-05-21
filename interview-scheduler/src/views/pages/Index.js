import Navbar from "../components/Navbar.js";
import CreateInterview from "../components/CreateInterview.js";
import { ServerPreifx } from "../../services/Config.js";
import GetUser from "../../services/GetUser.js";
import ViewInterview from "../components/ViewInterview.js";


let Index = {
  name: "Index",
  render : async () => {
    let view = `
      <div id="navbar-root"></div>
      <div id="create-interview-root"></div>
      <div id="view-interview-root"></div>
      <div class="calendar-wrapper">
        <div id="calendar-root">
        </div>
      </div>
    `;
    return view;
  },
  postRender: async () => {
    const navbar = document.getElementById('navbar-root');
    const calendarEl = document.getElementById('calendar-root');
    const createInterview = document.getElementById('create-interview-root');
    const viewInterview = document.getElementById('view-interview-root');
    const userData = GetUser();

    const calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: ['timeGrid'],
      events: {
        url: `${ServerPreifx}/api/interviews/fetch`,
        extraParams: {
          user_id: userData.userId,
          token: userData.token,
        },
      },
      eventClick: function(info) {
        const interviewId = info.event.id;
        const userData = GetUser();
        $.ajax({
          url: `${ServerPreifx}/api/interviews/get/${interviewId}`,
          data: {
            user_id: userData.userId,
            token: userData.token,
          },
          type: 'GET',
          success: function(data) {
            $("#_title").text(data.title);
            $("#_agenda").text(data.agenda);
            $("#_members").text(data.members);
            $("#_start").text(data.start);
            $("#_end").text(data.end);
            $("#_comments").text(data.comments);
            $("#_created_by").text(data.created_by);
            const updateUrl = `/#/${data.id}/edit`;
            const deleteUrl = `${ServerPreifx}/interviews/${interviewId}`;
            $("#_delete_int_id").attr('href', deleteUrl);
            $("#_update_int_id").attr('href', updateUrl);
            $("#interviewModal").modal('show');
          }
        });
      }
    });
    calendar.render();

    navbar.innerHTML = await Navbar.render();
    await Navbar.postRender();

    createInterview.innerHTML = await CreateInterview.render();
    await CreateInterview.postRender();

    viewInterview.innerHTML = await ViewInterview.render();
    await ViewInterview.postRender();
  }
}

export default Index;