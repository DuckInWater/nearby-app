

function initList(event_data) {
  console.log("RUNNING initList");
  var list_html =
    "<table class=\"table\">" +
    "<thead>" +
     "<tr>" +
       "<th>Group</th>" +
       "<th>Event Name</th>" +
       "<th>Event Date</th>" +
     "</tr>" +
     "</thead>";

  var list_item = "<tbody>";

  for(i=0; i<event_data.length; i++) {
    list_item = list_item +
      "<tr>" +
      "<td>" + event_data[i]['groupName'] + "</td>" +
      "<td>" + event_data[i]['eventName'] + "</td>" +
      "<td>" + event_data[i]['eventTime'] + "</td>" +
      "</tr>";
  }
  list_html = list_html + list_item + '</tbody>' + '</table>';

  $('#results_list').html(list_html);
}

// Work on initializing the list
