// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

import "bootstrap"
import $ from "jquery"

let currentPage;
let itemsPerPage;
let url;
let processed;

$(document).on('turbolinks:load', function() {
  currentPage = 1;
  itemsPerPage = 3;
  url = `/posts/paginate`;
  processed = false;
});

$(document).on('scroll' ,function(){
  let $contentDiv = $('#user-posts');
  if ($contentDiv != null) {
    const maxHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const position = document.documentElement.scrollTop;
    const threshold = 500;
    if (maxHeight - position <= threshold && !processed) {
      $.ajax({
        url: url,
        data: {
          page_num: currentPage + (processed = !processed),
          items_per_page: itemsPerPage,
        },
        success: function(data) {
          currentPage += 1;
          createPost(data, $contentDiv);
          processed = false;
        }
      });
    }
  }
});

function createPost(data, $el) {
  console.log(data);
  for (let i=0; i<data.length; i++) {
    const html = `
      <div class="post">
        <div class="post-head">
          <div class="name">
            ${data[i].user}
          </div>
        </div>
        <div class="image center-block">
          <a href="/posts/${data[i].id}"><img class="img-responsive" src="${data[i].img}"></a>
        </div>
        <p class="caption">
          ${data[i].caption}
        </p>
      </div>`;
    $el.append(html);
  }
}