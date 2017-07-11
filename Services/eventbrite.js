// 6NOED36AOSAWCNOWNK4G

var endpoint_url = 'https://api.meetup.com/find/groups?zip=10021';
var key = '6NOED36AOSAWCNOWNK4G';
var lat = 37.2828;
var long = -121.8448;

var ev_query = 'https://www.eventbriteapi.com/v3/events/search/?token='+key
+ '&location.latitude=' + lat
+ '&location.longitude=' + long
+ '&expand=organizer,venue';
  // + '&organizer.id=8231868522&expand=venue';

function getDataFromApi(query, callback) {
  $.getJSON(query, callback);
}

// Run the API request
getDataFromApi(ev_query, function(data) {
    console.log(data);
    for(i=0;i<data['events'].length;i++) {
      marker_lat = data['events'][i]["venue"]['latitude'];
      marker_lat = parseFloat(marker_lat.substring(0,marker_lat.length-3));

      marker_long = data['events'][i]["venue"]['longitude'];
      marker_long = parseFloat(marker_long.substring(0,marker_long.length-3));

      addMarker(marker_lat,marker_long);
      // debugger;
    }
});
