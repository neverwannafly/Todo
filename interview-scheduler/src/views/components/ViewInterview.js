import GetUser from "../../services/GetUser.js";
import Redirect from "../../services/Redirect.js";
import IssueNotice from "../../services/IssueNotice.js";
import { YELLOW_NOTICE, RED_NOTICE } from "../../services/Config.js";

let ViewInterview = {
  name: "ViewInterview",
  render: async () => {
    let view = /*html*/`
      <div class="modal fade" id="interviewModal" tabindex="-1" role="dialog" aria-labelledby="interviewModalLabel" aria-modal="true">
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
                      <th scope="col">Title</th>
                      <td id="_title"></td>
                    </tr>

                    <tr>
                      <th scope="col">Agenda</th>
                      <td id="_agenda"></td>
                    </tr>
                    
                    <tr>
                      <th scope="col">Members</th>
                      <td id="_members"></td>
                    </tr>
                    
                    <tr>
                      <th scope="col">Start Time</th>
                      <td id="_start"></td>
                    </tr>
                    
                    <tr>
                      <th scope="col">End Time</th>
                      <td id="_end"></td>
                    </tr>
                    
                    <tr>
                      <th scope="col">Comments</th>
                      <td id="_comments"></td>
                    </tr>
                    
                    <tr>
                      <th scope="col">Created By</th>
                      <td id="_created_by"></td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>
            </div>
            <div class="modal-footer">
              <a id="_update_int_id" class="btn btn-outline-info" href="#">Edit</a>
              <a id="_delete_int_id" class="btn btn-outline-danger" href="#">Delete</a>
              <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `;
    return view;
  },
  postRender: async() => {
    const updateButton = document.getElementById('_update_int_id');
    const deleteButton = document.getElementById('_delete_int_id');

    updateButton.addEventListener('click', () => {
      $('.modal').modal('hide');
    });

    deleteButton.addEventListener('click', event => {
      event.preventDefault();
      const url = deleteButton.getAttribute('href');
      const userData = GetUser();
      const confirm = window.confirm("Are you sure? This change is irreversible!");
      if (confirm) {
        $.ajax({
          url: url,
          method: 'DELETE',
          data: {
            user_id: userData.userId,
            token: userData.token,
            success: async data => {
              if (data.success) {
                await Redirect('/');
                await IssueNotice('Successfully deleted interview!', YELLOW_NOTICE);
              } else {
                await IssueNotice("Something went wrong! Please try again later!", RED_NOTICE);
              }
            }
          }
        });
        $('.modal').modal('hide');
      }
    })

  }
}

export default ViewInterview;