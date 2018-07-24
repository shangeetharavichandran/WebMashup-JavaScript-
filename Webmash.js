//Web Mashup: Display House Address on a Map with Weather details
//Shangeetha Ravichandran Susseelaa --> 1001357420
// Put your GeoNames API key here
var username = "shangeetha";
var request = new XMLHttpRequest();
var map;
var geocoder;
var infowindow;
var marker;
//initMap() which initiates map to a location
function initMap() {
//initialize map
map = new google.maps.Map(document.getElementById('map'),{
center: {lat: 32.75, lng: -97.13},
zoom: 17
});
geocoder = new google.maps.Geocoder;
infowindow = new google.maps.InfoWindow;
//Initialize a mouse click event on map which then calls reversegeocode function
google.maps.event.addListener(map, 'click', function(event) {
reversegeocode(event.latLng);
});
}
// Reverse Geocoding
function reversegeocode(location) {
//call geoname api asynchronously with latitude and longitude
sendRequest(location.lat(),location.lng());
//get the latitude and longitude from the mouse click and get the address.
var latlng = {lat: location.lat(), lng: location.lng()};
//get the postal address
geocoder.geocode({'location': latlng}, function(results, status) {
if (status === google.maps.GeocoderStatus.OK) {
if (results[0]) {
map.setZoom(17);
if(marker != null){
marker.setMap(null);
}
marker = new google.maps.Marker({
position: latlng,
map: map
});
infowindow.setContent(results[0].formatted_address);
} else {
window.alert('No results found');
}
} else {
window.alert('Geocoder failed due to: ' + status);
}
});
// end of geocodeLatLng()
}
//Clears all History Log
function onCLickButton() {
document.getElementById("output").innerHTML = "";
}
function displayResult () {
if (request.readyState == 4) {
//extract the temperature,clouds and windspeed
var xml = request.responseXML.documentElement;
var temperature = xml.getElementsByTagName("temperature");
var clouds = xml.getElementsByTagName("clouds");
var windSpeed = xml.getElementsByTagName("windSpeed");
var address = infowindow.getContent();
var weather = "Temperature is:" +temperature[0].innerHTML +" Clouds:" +clouds[0].
innerHTML + " Windspeed:" +windSpeed[0].innerHTML;
document.getElementById("output").innerHTML+= "<br/>"+ address+":"+ weather;
//show the overlay information of weather and location
infowindow.setContent(address+":"+ weather);
infowindow.open(map,marker)
}
}
function sendRequest (lat, lng) {
//onready state change is whenever the response returns will call function displayResult
request.onreadystatechange = displayResult;
console.log(lat);
//sending a request
request.open("GET"," http://api.geonames.org/findNearByWeatherXML?lat="+lat+"&lng="+lng+
"&username="+username);
//request.withCredentials = "true";
request.send();
}
