// Promise chain for Meetup data
// 1. Request API data from Meetup using $.getJSON
//       a. Write a function that requests Meetup data
//       b. Create a promise that makes this request
// 2. Create a function that populates the Map given a dataset
//       a. Create a promise that calls this function



// -----Practice #2-----
console.log("Running");

var Meetup = {
  endpoint_url: 'https://api.meetup.com/find/groups?zip=10021',
  part: 'snippet',
  key: 'a7246686c62843564b2824401b1864',
  zip_lat: 37.3382,
  zip_lon: -121.8863,
  distance: 10
}

Meetup.ev_query = 'http://api.meetup.com/find/events/'
  + '?lat=' + Meetup.zip_lat
  + '&lon=' + Meetup.zip_lon
  + '&radius=' + Meetup.distance
  + '&key=' + Meetup.key
  + '&callback=?';

// OLD VERSION, WORKS WITHOUT PROMISE
// Meetup.getDataFromAPI = function (user_lat, user_lon) {
//   Meetup.update_location(user_lat, user_lon);
//   var meetup_locations = [];
//   $.getJSON(Meetup.ev_query, function(data) {
//       var location = [];
//       var marker_lat;
//       var marker_lon;
//       for(i=0; i<data['data'].length; i++) {
//         try {
//           marker_lat = data["data"][i]['venue']['lat'];
//           marker_lon = data["data"][i]['venue']['lon'];
//           location = [];
//           location.push(marker_lat);
//           location.push(marker_lon);
//           meetup_locations.push(location);
//           console.log(meetup_locations);
//         } catch(err) {
//         }
//       }
//   });
//   debugger;
//   return meetup_locations;
// }

// OLD CODE TO TRY TO PROMISIFY THE CALLBACK, BUT THIS WAY ISN'T ASYNC
// var results = new Promise(function(resolve,reject) {
//   var locations = Meetup.getDataFromAPI(37.3382,-121.8863);
//   if (locations.length === 0) {
//     console.log("NO DATA");
//     // reject("NO DATA");
//   } else {
//     resolve(locations);
//   }
// });

Meetup.update_location = function(user_lat, user_lon) {
  Meetup['zip_lat'] = user_lat;
  Meetup['zip_long'] = user_lon;
}

// PROMISIFY THE API REQUEST, RETURNS A PROMISE
Meetup.getDataFromAPI = function(user_lat, user_lon) {
  Meetup.update_location(user_lat, user_lon);
  return new Promise(function(resolve,reject)
  {
    $.getJSON(Meetup.ev_query)
      .done(function(data) {
        resolve(data);
      })
      .fail(console.log("JSON request failed"));
  });
}

Meetup.parseAPIData = function(data) {
  var meetup_locations = [];
  var marker_lat;
  var marker_lon;
  for(i=0; i<data['data'].length; i++) {
    try {
      marker_lat = data["data"][i]['venue']['lat'];
      marker_lon = data["data"][i]['venue']['lon'];
      location = [];
      location.push(marker_lat);
      location.push(marker_lon);
      meetup_locations.push(location);
      console.log(meetup_locations);
    } catch(err) {
    }
  }
}

Meetup.getEventLocations = function(user_lat,user_lon) {
  return Meetup.getDataFromAPI(user_lat,user_lon).then(function(data) {
    var meetup_locations = [];
    var location = [];
    var marker_lat;
    var marker_lon;
    for(i=0; i<data['data'].length; i++) {
      try {
        marker_lat = data["data"][i]['venue']['lat'];
        marker_lon = data["data"][i]['venue']['lon'];
        location = [];
        location.push(marker_lat);
        location.push(marker_lon);
        meetup_locations.push(location);
      } catch(err) {
      }
    }
    return meetup_locations;
  });
}

// var results = new RSVP.Promise(function(fulfill, reject) {
//   var data = getData();
//   console.log(data);
//   if (data >= 3) {
//     fulfill(data);
//   } else {
//     reject("Result is less than 3");
//   }
// });

// results.then(function(data) {
//   console.log("RESOLVING PROMISE");
//   populateMap(data);
// });
