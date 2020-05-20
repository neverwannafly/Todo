let Index = {
  render : async () => {
    
    let view = `
      <div class="calendar-wrapper">
        <div id="calendar">
        </div>
      </div>
    `;
    return view;
  },
  after_render: async () => {
    const calendarEl = document.getElementById('calendar');
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
  }
}

export default Index;