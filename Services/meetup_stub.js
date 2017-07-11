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

  // ev_query = 'https://api.meetup.com/find/groups?zip=95136&key=' + key
  //   + '&radius=' + distance
  //   + '&callback=?'


  // function getDataFromApi(query, callback) {
  //   $.getJSON(query, callback);
  // }

  // Run the API request
Meetup.init = function() {
  return getDataFromApi(Meetup.ev_query).then(function(data) {
      console.log(data);
      return data; //newly added 6/19

      var event_data = [];

      for(i=0; i<data['data'].length; i++) {
        console.log(i);
        try {
          marker_lat = data["data"][i]['venue']['lat'];
          marker_long = data["data"][i]['venue']['lon'];
          addMarker(marker_lat,marker_long,'blue');

          group_name = data["data"][i]['group']['name'];
          event_name = data["data"][i]['name'];
          event_time = data["data"][i]['time'];

          event_data.push({
            'groupName': group_name,
            'eventName': event_name,
            'eventTime': event_time
          });
        }
        catch (err) {
        }
      }

      initList(event_data);

  });
}

  // data["data"][0]['venue']['lat']
