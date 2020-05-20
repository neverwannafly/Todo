let Modals = {
  render: async () => {
    let view = /*html*/`
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
      <div class="modal fade" id="interviewModal" tabindex="-1" role="dialog" aria-labelledby="interviewModalLabel" aria-modal="true" style="display: block; padding-left: 0px;">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="interviewModalLabel">Interview Details</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="table-responsive">
                <table class="table table-hover">
                  <tbody>
                    <tr>
                      <th scope="col">Agenda</th>
                      <td id="_agenda">Test the damn Email</td>
                    </tr>
                    
                    <tr>
                      <th scope="col">Members</th>
                      <td id="_members">neverwannafly,venice,ron_wizard,janice,marky</td>
                    </tr>
                    
                    <tr>
                      <th scope="col">Start Time</th>
                      <td id="_start">20 May 05:50</td>
                    </tr>
                    
                    <tr>
                      <th scope="col">End Time</th>
                      <td id="_end">20 May 07:50</td>
                    </tr>
                    
                    <tr>
                      <th scope="col">Comments</th>
                      <td id="_comments">We'll have fun seeing an email</td>
                    </tr>
                    
                    <tr>
                      <th scope="col">Created By</th>
                      <td id="_created_by">neverwannafly</td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>
            </div>
            <div class="modal-footer">
              <a id="_update_int_id" class="btn btn-outline-info" href="/#/interviews/1/edit">Edit</a>
              <a id="_delete_int_id" class="btn btn-outline-danger" data-confirm="Are you sure?" rel="nofollow" data-method="delete" href="/#/interviews/1">Delete</a>
              <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;
    return view;
  },
  postRender: async () => {
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

export default Modals;