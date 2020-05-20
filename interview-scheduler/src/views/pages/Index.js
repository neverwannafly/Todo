import Navbar from "../components/Navbar.js";
import Modals from "../components/Modals.js";


let Index = {
  name: "Index",
  render : async () => {
    let view = `
      <div id="navbar"></div>
      <div id="modals"></div>
      <div class="calendar-wrapper">
        <div id="calendar">
        </div>
      </div>
    `;
    return view;
  },
  postRender: async () => {
    const navbar = document.getElementById('navbar');
    const calendarEl = document.getElementById('calendar');
    const modals = document.getElementById('modals');

    const calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: ['timeGrid'],
      events: {
        url: 'http://localhost:3000/api/interviews/fetch',
      },
      eventClick: function(info) {
        // const interviewId = info.event.id;
        // $.ajax({
        //   url: `/api/interviews/get/${interviewId}`,
        //   type: 'GET',
        //   success: function(data) {
        //     console.log(data.agenda);
        //     $("#_agenda").text(data.agenda);
        //     $("#_members").text(data.members);
        //     $("#_start").text(data.start);
        //     $("#_end").text(data.end);
        //     $("#_comments").text(data.comments);
        //     $("#_created_by").text(data.created_by);
        //     const url = $("#_delete_int_id").attr('href');
        //     $("#_delete_int_id").attr('href', `${url}${data.id}`);
        //     $("#_update_int_id").attr('href', `${url}${data.id}/edit`);
        //     $("#interviewModal").modal('show');
        //   }
        // });
      }
    });
    calendar.render();

    navbar.innerHTML = await Navbar.render();
    await Navbar.postRender();

    modals.innerHTML = await Modals.render();
    await Modals.postRender();
  }
}

export default Index;