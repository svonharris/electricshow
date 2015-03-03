// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.




$( document ).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  }
});


// $(document).ready(function() {
//   if(window.location === "/") {
//     // if (navigator.geolocation) {
//     //   navigator.geolocation.getCurrentPosition(success, error);
//     // }
//     alert('yes');
//     console.log('yes');
//   }
// });

function error(n) {
  // console.log(n.message);
  $('.error_msg').text("Could not locate your location.");
}

function success(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  $.ajax({
    type: 'GET',
    url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' +latitude+ ',' +longitude+ '&sensor=true',
    dataType: 'json'
  }).done(function(data){
    // console.log(data)
    // console.log(data.results[1].address_components[2].long_name)
    var city = data.results[1].address_components[1].long_name
    get30Events(city);
    // getTodayEvents(city);
  }).error(function(error) {
    alert('An error occurred while trying to find your location.');
  });
}


function get30Events(city) {
  $.ajax({
    url: '/search/' + city,
    type: "POST",
  }).done(function( msg ) {
    $('.js-30days').empty();
    msg.forEach(function(show) {
      var fullDate = new Date();
      var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
      var twoDigitDate = fullDate.getDate()+"";if(twoDigitDate.length==1) twoDigitDate="0" +twoDigitDate;
      var currentDate = fullDate.getFullYear() + "-" + twoDigitMonth + "-" + twoDigitDate;
      
      // console.log(currentDate == show.date);
      if (currentDate == show.date) {
        getTodayEvents(show);
      } else {
        $('.js-30days').append("<li><a href='/events/" +show.id+ "'>" +show.title+ "</a></li>");
      }
    });
  });
}


function getTodayEvents(show) {
  $('.js-today').append("<li><a href='/events/" +show.id+ "'>" +show.title+ "</a></li>");
}









