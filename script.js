$(document).ready(function() {
  // Provide your access token
  L.mapbox.accessToken = 'pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImJkN2FkOTFjNDM4OGQzNWUyYzY3NjU4ODM4ZDYwNDJmIn0.FLniij4ORShXSqRe6pcw-A';
  // Create a map in the div #map
  var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([40, -74.50], 5);

  // clear the weather observations
  $("input[name='clear']").on("click", function(){
    $("#data").empty()
  })

  // get location on map, call weather function with lat & lng
  map.on('click', function(e) {
    var location = e.latlng
    showWeather(location)
  });

  // get weather for passed location from Weather Underground
  function showWeather(location) {
    var url = "http://api.wunderground.com/api/8e67e353382cf3e8/conditions/q/" + location.lat + "," + location.lng + ".json"
    $.ajax({
      url: url,
      type: "GET",
      dataType: "json"
    }).done(function(response){
      var weather = response.current_observation
      $("#data").prepend("<p> Temperature in " + weather.display_location.full + ": " + weather.temperature_string + "</p>")
    }).fail(function(){
      alert("Something went wrong, try again.")
    })
  }
})
