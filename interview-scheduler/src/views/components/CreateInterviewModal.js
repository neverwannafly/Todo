let CreateInterviewModal = {
  render: async () => {
    let view = `
      <div class="modal fade" id="createModal" tabindex="-1" role="dialog" aria-labelledby="createModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="createModalLabel">Create Interview</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body">
              <form id="create_interview" action="/interviews" accept-charset="UTF-8" method="post"><input type="hidden" name="authenticity_token" value="gxrs4xxS7ZNLzhsEqofLIkT8BoVuZ0tRfSzTCrKxNaF0oEw3UL+jGh7zMZqJEvNPlB9y4P16xzs1FKpEps61yA==">
      
                <div class="form-group">
                  <label for="interview_title">Title</label>
                  <input class="form-control" type="text" name="interview[title]" id="interview_title">
                </div>
              
                <div class="form-group">
                  <label for="interview_agenda">Agenda</label>
                  <input class="form-control" type="text" name="interview[agenda]" id="interview_agenda">
                </div>
              
                <div class="form-group">
                  <label for="interview_members">Members</label>
                  <input id="find-users" type="text" name="interview[members]">
                </div>
              
                <div class="form-group">
                  <label for="interview_start">Start</label>
                  <input class="form-control" id="dtp_beg" type="datetime-local" name="interview[start]">
                </div>
              
                <div class="form-group">
                  <label for="interview_end">End</label>
                  <input class="form-control" id="dtp_end" type="datetime-local" name="interview[end]">
                </div>
              
                <div class="form-group">
                  <label for="interview_comments">Comments</label>
                  <textarea class="form-control" name="interview[comments]" id="interview_comments"></textarea>
                </div>
              
                <div class="actions">
                  <input type="submit" name="commit" value="Create" class="btn btn-primary btn-block" data-disable-with="Create">
                </div>
              
              </form>
            </div>
          </div>
        </div>
      </div>
    `;
    return view;
  },
  after_render: async () => {
    const $findUsers = document.getElementById('find-users');
    $($findUsers).selectize({
      options: [],
      create: false,
      persist: false,
      maxItems: null,
      delimiter: ',',
      valueField: 'id',
      labelField: 'username',
      searchField: ['username'],
      render: {
        option: function (item, escape) {
          return '<div>' + escape(item.username) + '</div>';
        }
      },
      load: function(query, callback) {
        if (!query.length) return callback();
        $.ajax({
          url: '/api/users/fetch',
          type: 'GET',
          data: {
            query: query,
          },
          error: function() {
              callback();
          },
          success: function(res) {
            callback(res);
          }
        });
      }
    });
  }
}

export default CreateInterviewModal;