let ViewInterview = {
  name: "ViewInterview",
  render: async () => {
    let view = `
      <div class="modal fade" id="interviewModal" tabindex="-1" role="dialog" aria-labelledby="interviewModalLabel" aria-modal="true"">
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
  postRender: async() => {

  }
}

export default ViewInterview;