
// Get user location
// 1. Prompt user for access to location

// Learnings:
// 1) Consume a promise,
// 2) Use app.js as an orchestrator

// Document.ready function

console.log("RUNNING app.js");
var user_lat = 37.282;
var user_lon = -121.844;
var events_data;

$('#start_button').click(async function(){
  // $.submit(loadFunctionData);
  // if(locationApproved) {
  //   loadFunctionData(loc);
  // }
  console.log("Populating app");
  getLocation().then(function(data) {
    initMap(data[0],data[1]);
    return data;
  }).then(function(data) {
    return Meetup.getEventLocations(data[0],data[1]);
  }).then(function(locationData) {
    populateMap(locationData);
  });
  // var meetup_locations = Meetup.getEventLocations(user_lat, user_lon);
  // debugger;
  // initMap(user_lat, user_lon);
  // populateMap(meetup_locations);
  // populateTable(events_data);
});

function getLocation() {
  return new Promise(function(resolve,reject) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        user_lat = position.coords.latitude;
        user_lon = position.coords.longitude;
        if (user_lat && user_lon) {
          resolve([user_lat,user_lon]);
        } else {
          reject("No location data");
        }
      });
    } else {
      reject("No location data");
    }
  });
}

function getData(user_lat, user_lon) {
  events_data = Meetup.getDataFromAPI(user_lat, user_lon);
}


//   function loadData() {
//     Meetup.init()
//   }
// }

//
// var providers = {Yelp:getYelpData,Twitter:getTwitterData};
//
// function loadFunctionData(location) {
//   var promises = [];
//
//   Object.keys(providers)
//     .forEach(function(provider) {
//       promises.push(providers[provider](location))
//   });
//
//   Promise.all(promises) {
//     .then(loadComponents);
//     .catch(handleErrors);
//   }
//
// }
