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

import $ from "jquery"

import "bootstrap"
import "./selectize.min"
import { Calendar } from "@fullcalendar/core"
import timeGridPlugin from "@fullcalendar/timegrid"

document.addEventListener('turbolinks:load', function(){
  const calendarEl = document.getElementById('calendar');
  const calendar = new Calendar(calendarEl, {
    plugins: [timeGridPlugin],
    events: {
      url: 'api/interviews/fetch',
    },
    eventClick: function(info) {
      const interviewId = info.event.id;
      $.ajax({
        url: `api/interviews/get/${interviewId}`,
        type: 'GET',
        success: function(data) {
          console.log(data);
        }
      });
    }
  });
  calendar.render();

  $('#find-users').selectize({
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
        url: 'api/users/fetch',
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
});