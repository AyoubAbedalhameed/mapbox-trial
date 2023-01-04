

var myVar;

function myFunction() {
    myVar = setTimeout(showPage, 3000);
}

function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
}



const locationSubmit = document.querySelector('.locationSubmit');
const locationValue = document.querySelector('.locationValue');

function getMap(lat, long, type){

    let zoomVal =11;
    if(type == "country"){
        zoomVal = 5;
    }else if (type == "default")
        zoomVal = 17;
    mapboxgl.accessToken = 'pk.eyJ1IjoiYXlvdWItYWIiLCJhIjoiY2xjZ295MnlkMGFndTQxbzZhYzlmbGY1cyJ9.6HWQOjOnNDtI_GnGU9O3jw';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lat, long],
        zoom: zoomVal
    });

    const el = document.createElement('div');
    el.className = 'marker';
    let pwcMarker = new mapboxgl.Marker(el)
        .setLngLat([35.907894, 31.956049 ])
        .addTo(map);



}
getMap(35.907894, 31.956049, "default");


function run(query) {


    query = String(locationValue.value)
    fetch('http://api.positionstack.com/v1/forward?access_key=dbcc446497b46a95436f6fed9177dc85&query=' + query + '&limit=1').then(function (response) {

        return response.json();
    }).then(function (obj) {

        if(Object.keys(obj.data).length) {

            let latitude = obj["data"]["0"]["latitude"];
            let longitude = obj["data"]["0"]["longitude"];
            let type = obj["data"]["0"]["type"];


            getMap(longitude, latitude, type);
        } else {
            alert("Location not found, please try again");
        }
    })
}

locationSubmit.addEventListener('click', run);





