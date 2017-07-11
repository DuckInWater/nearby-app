# NearbyApp
App for viewing events nearby

index.html

main.css

app.js
api.js

/services
meetup.js
gmaps.js
yelp.js
twitter.js

/components
list.js
map.js


-- Flow --
1. Get location from user
2. Pass location to each service
3. Services receive data
4. Services pass data back to original caller
5. Pass data to each components


-- Structure --
1. app.js serves as orchestrator. Launches individual services to populate
   the page.
   a.  Calls loadData, which calls various init() methods (in the first version,
       just meetup.init()) to get data
   b.  Calls populateMap to populate the map with the data
   c.  Calls populateTable to populate the table with the data
