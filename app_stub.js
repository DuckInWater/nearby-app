
// Get user location
// 1. Prompt user for access to location

// Learnings:
// 1) Consume a promise,
// 2) Use app.js as an orchestrator

// Document.ready function
$(function(){
  // $.submit(loadFunctionData);
  // if(locationApproved) {
  //   loadFunctionData(loc);
  // }
  Meetup.init().then(addMarker).then(initList)
  Meetup.init().then(function(data) {
    //The return makes sure initList doesn't run until addMarker finishes
    return addMarker(data);
  }).then(function(data) {
    return initList(data);
  });
});

var providers = {Yelp:getYelpData,Twitter:getTwitterData};

function loadFunctionData(location) {
  var promises = [];

  Object.keys(providers)
    .forEach(function(provider) {
      promises.push(providers[provider](location))
  });

  Promise.all(promises) {
    .then(loadComponents);
    .catch(handleErrors);
  }

}
