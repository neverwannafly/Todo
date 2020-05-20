import Navbar from "../components/Navbar.js";
import CreateInterview from "../components/CreateInterview.js";
import { ServerPreifx } from "../../services/Config.js";
import GetUser from "../../services/GetUser.js";


let Index = {
  name: "Index",
  render : async () => {
    let view = `
      <div id="navbar-root"></div>
      <div id="create-interview-root"></div>
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

    const calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: ['timeGrid'],
      events: {
        url: `${ServerPreifx}/api/interviews/fetch`,
        extraParams: {
          user_id: GetUser.userId,
          token: GetUser.token,
        }
      },
      eventClick: function(info) {
        const interviewId = info.event.id;
        $.ajax({
          url: `/api/interviews/get/${interviewId}`,
          type: 'GET',
          success: function(data) {
            console.log(data.agenda);
            $("#_agenda").text(data.agenda);
            $("#_members").text(data.members);
            $("#_start").text(data.start);
            $("#_end").text(data.end);
            $("#_comments").text(data.comments);
            $("#_created_by").text(data.created_by);
            const url = $("#_delete_int_id").attr('href');
            $("#_delete_int_id").attr('href', `${url}${data.id}`);
            $("#_update_int_id").attr('href', `${url}${data.id}/edit`);
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
  }
}

export default Index;