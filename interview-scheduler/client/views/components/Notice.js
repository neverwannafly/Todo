let Notice = {
  name: "Notice",
  render: async (content, color) => {
    let view = /*html*/`
      <div class="alert alert-${color} alert-dismissible fade show" role="alert">
        ${content}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    `;
    return view;
  },
  postRender: async () => {

  }
}

export default Notice;