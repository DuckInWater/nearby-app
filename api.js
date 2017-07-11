


function api(config,location) {
  return new Promise(function(resolve,reject) {
    // Object.assign overwrites the left-hand argument with right-hand argument
    $.ajax(Object.assign({
      type: "get",
      success: function(data) {resolve(data)}, //resolve,
      error: reject,
      contentType: 'application/json'
    },config));
  });
}

function getDataFromApi(query) {
  return new Promise(function(resolve,reject) {
    $.getJSON(query, resolve);
  });
}
