import { ServerPreifx } from "./Config.js";

const Autocomplete = (el) => {
  const textField = document.getElementById(el);
  $(textField).selectize({
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
        url: `${ServerPreifx}/api/users/fetch`,
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

export default Autocomplete;