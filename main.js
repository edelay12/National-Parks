window.onload = function(){
    console.log('app loaded')
    watchSubmit();
}
const key = '&api_key=32gccQFQ6Lcjzj3JWOsnHOQbB3PtO9qkT2efNIt3';
const searchURL = 'https://developer.nps.gov/api/v1/parks?stateCode='

function watchSubmit(){
$('.form').on('submit', function(e){
    e.preventDefault();
let state = $('#userInput').val();
let number = '&limit='+ $('#resultsNumber').val();
console.log(number)
fetchUrl();

function fetchUrl(){
    const url = searchURL + state + number + key;
    console.log(url);
fetch(url)
.then(Response => { 
    if(Response.ok) {
        return Response.json();
    }
    throw new Error(Response.statusText)
})
    .then(ResponseJson => {
        console.log(ResponseJson)
        renderDOM(ResponseJson);
    })
.catch(err => {
    $('.list').empty();
    $('#js-error').text(err);
});

}
})

function renderDOM(ResponseJson){
    $('.list').empty();
    console.log(ResponseJson)
    for(let i=0; i<ResponseJson.data.length; i++){
        console.log(i)
        const name = ResponseJson.data[i].fullName;
        const description1 = ResponseJson.data[i].description;
        const siteUrl = ResponseJson.data[i].url;
        const directions = ResponseJson.data[i].directionsUrl;
        const address = ResponseJson.data[i].latLong;
       // <h3 id="adress">Adress: ${GetAddress(address)}</h3>
        $('.list').append(`
<li><h1 id="siteName">Site ${i+1}: ${name}</h1><br>
<h3 id="siteDescription">Description: ${description1}</h3><br>
<h3 id="siteUrl">Url: ${siteUrl}</h3><br>
<h3 id="siteDirections">Directions:  ${directions}</h3></li>
<hr>
        `);
    }

}  

/*function GetAddress(address) {
    let ll = address.split(",");
    console.log(ll)
    
        var lat = 38.6258069;
                var lng = -90.1892508;
                var latlng = new google.maps.LatLng(lat, lng);
                var geocoder = geocoder = new google.maps.Geocoder();
                geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            alert("Location: " + results[1].formatted_address);
                        }
                    }
                });
    }*/

}

