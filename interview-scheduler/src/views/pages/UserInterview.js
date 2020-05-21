import { ServerPreifx } from "../../services/Config.js";
import GetUser from "../../services/GetUser.js";
import Navbar from "../components/Navbar.js";
import CreateInterview from "../components/CreateInterview.js";

let UserInterview = {
  name: "UserInterview",
  render: async () => {
    let view = /*html*/`
      <div id="navbar-root"></div>
      <div id="create-interview-root"></div>
      <div class="wrapper">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead class="thead-dark">
              <tr>
                <th class="user-interview-cell" scope="col"> ID </th>
                <th class="user-interview-cell" scope="col"> Title </th>
                <th class="user-interview-cell" scope="col"> Agenda </th>
                <th class="user-interview-cell" scope="col"> Start Time </th>
                <th class="user-interview-cell" scope="col"> End Time </th>
                <th class="user-interview-cell" scope="col"> Comments </th>
                <th class="user-interview-cell" scope="col"> Created By </th>
              </tr>
            </thead>
            <tbody id="table-content-root">
            </tbody>
          </table>
        </div>
      </div>
    `;
    return view;
  },
  postRender: async () => {
    const interviews = document.getElementById('table-content-root');
    const navbar = document.getElementById('navbar-root');
    const createInterview = document.getElementById('create-interview-root');
    const userData = GetUser();
    const url = `${ServerPreifx}/interviews/${userData.userId}`;
    $.ajax({
      url: url,
      data: {
        token: userData.token,
        user_id: userData.userId,
      },
      type: 'GET',
      success: async (data) => {
        let contentView = ``;
        for (let interview of data.interviews) {
          contentView += /*html*/`
            <tr>
              <th class="user-interview-cell" id="__id" scope="col"> ${interview.id ?? "NA"} </th>
              <td class="user-interview-cell" id="__title"> ${interview.title ?? "NA"} </td>
              <td class="user-interview-cell" id="__agenda"> ${interview.agenda ?? "NA"} </td>
              <td class="user-interview-cell" id="__start"> ${interview.start ?? "NA"} </td>
              <td class="user-interview-cell" id="__end"> ${interview.end ?? "NA"} </td>
              <td class="user-interview-cell" id="__comments"> ${interview.comments ?? "NA"} </td>
              <td class="user-interview-cell"> ${interview.created_by ?? "NA"} </td>
            </tr>
          `;
        }
        interviews.innerHTML = contentView;
      }
    });

    navbar.innerHTML = await Navbar.render();
    await Navbar.postRender();

    createInterview.innerHTML = await CreateInterview.render();
    await CreateInterview.postRender();
  }
};

export default UserInterview;