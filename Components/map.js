// AIzaSyA16eMYKZ4AfHPAxYJAbMgPm_ouh-lfKqc
var lat_global = 37.282;
var long_global = -121.844;
var home_image = 'Assets/HomeIcon.png'
var map;

function initMap(lat_global, long_global) {
   var home = {lat: lat_global, lng: long_global};
   map = new google.maps.Map(document.getElementById('results_map'), {
     zoom: 11,
     center: home
   });
   var marker = new google.maps.Marker({
     position: home,
     map: map,
     icon: home_image
   });
}

// OLD FUNCTION
// function populateMap(data) {
//
//   for(i=0; i<data['data'].length; i++) {
//     try {
//       marker_lat = data["data"][i]['venue']['lat'];
//       marker_long = data["data"][i]['venue']['lon'];
//       addMarker(marker_lat,marker_long,'blue');
//     }
//     catch (err) {
//     }
//   }
// }

function populateMap(data) {
  debugger;
  for(i=0; i<data.length; i++) {
    try {
      marker_lat = data[i][0];
      marker_long = data[i][1];
      addMarker(marker_lat,marker_long,'blue');
    } catch(err) {
    }
  }
}

function addMarker(lat,long,color) {
  var newMarker = {lat:lat, lng:long};
  new google.maps.Marker({
    position: newMarker,
    map: map,
    icon: 'http://maps.google.com/mapfiles/ms/icons/' + color + '-dot.png'
  });
}
