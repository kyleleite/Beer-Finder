// CREATING EMPTY VARIABLES WE NEED TO USE GLOBALLY
var beerApp = {};
var userBeerType = '';
var userCategory = '';
var userCountry = '';



// USERS FORM SELECTION & SUBMIT  //
//-------------------------------//

$('.beer').click(function(e) {
  e.preventDefault();
  // grab user choice, store in a variable
  userBeerType = $('select#beerType option:selected').val();
  userCategory = $('select#beerCategory option:selected').val();

  beerApp.getData();
  $('#beerBox').empty();

});

$('.country').click(function(e) {
  e.preventDefault();
  // grab user choice, store in a variable
  userCountry = $('select#beerCountry option:selected').val();
  // run search
  
  beerApp.getCountry();
$('#beerBox').empty();
})

// RETURNS LOCATION / GEOLOCATION  //
//--------------------------------//

navigator.geolocation.getCurrentPosition(function(position){
	console.log(position);
})


// ON CLICK OF BEER SELECTION, RETURN ALL STORES WITH SPECIFIED PRODUCT //
//---------------------------------------------------------------------//

// RETURNS ALL BEERS FROM SELECTION  //
//----------------------------------//
beerApp.getData = function(){
  $.ajax({
    url: 'http://proxy.hackeryou.com',
    method:'GET',
    dataType: 'json',
    data: {
        reqUrl: 'http://ontariobeerapi.ca:80/beers',
        type: userBeerType,
        category: userCategory,
        }
   }).then(function(apiData) {

    beerApp.displayBeer(apiData);

});
};

beerApp.getCountry = function(){
  $.ajax({
    url: 'http://proxy.hackeryou.com',
    method:'GET',
    dataType: 'json',
    data: {
        reqUrl: 'http://ontariobeerapi.ca:80/beers',
        country: userCountry,
        }
   }).then(function(countryData) {

    beerApp.displayBeer(countryData);

});
};

 //DISPLAY SELECTED BEERS ON PAGE //
//-------------------------------//

beerApp.displayBeer = function(generatedBeer){


  generatedBeer.forEach(function(displayedBeer){

    if (displayedBeer.image_url != null){

      var img = new Image();
      img.src = displayedBeer.image_url;

      img.addEventListener('load', function(){
          var displayedBeerImage = $('<img>').attr('src',displayedBeer.image_url);
          var displayedBeerName = $('<h3>').text(displayedBeer.name);
          var displayedBeerType = $('<p>').text(displayedBeer.type);
          var displayedBeerCategory = $('<p>').text(displayedBeer.category);
          var displayedBeerCountry = $('<p>').text(displayedBeer.country);
          var displayedBeerAbv = $('<p>').text(displayedBeer.abv);

          var displayedBeerPic = $('<div>').append(displayedBeerImage).addClass('beerImages');

          var displayedBeerInfo = $('<div>').append(displayedBeerName,displayedBeerCountry,displayedBeerCategory,displayedBeerType,displayedBeerAbv).addClass('beerData');

          var beerWrapper = $('<div>').addClass('beerWrapper');

          $('#beerBox').append(beerWrapper);

          beerWrapper.append(displayedBeerPic);
          beerWrapper.append(displayedBeerInfo);

          console.log(displayedBeerInfo);
      });
    }
  });
};






