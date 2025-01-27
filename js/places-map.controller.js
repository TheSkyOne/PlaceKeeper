import { placeService } from "./services/place.service.js";


window.app = {
    onLoad,
    onRemovePlace,
    onNavigate,
}

var elMap = undefined
var gMap = undefined


function onLoad(){
    renderPlaces()
    initMap()
}


// https://developers.google.com/maps/documentation/javascript/events#EventArguments
// dynamic loading of the map as described in https://developers.google.com/maps/documentation/javascript/load-maps-js-api#migrate-to-dynamic
// when using this, also go to api-key-loader.service.js and comment the first 'script.src' and uncomment the second one
// async function initMap(){
//     elMap = document.querySelector("gmp-map")
//     const {Map} = await google.maps.importLibrary("maps")

//     gMap = new Map(elMap, 
//     {
//         zoom: elMap.zoom,
//         center: {lat:29.557669, lng: 34.951923},
//         mapId: elMap.mapId
//     })
    
//     console.log(gMap)
//     gMap.addListener("click", (ev) => console.log(ev)) //why does this not work?
// }


// non-dynamic way of loading the map
// when using this, also go to api-key-loader.service.js and uncomment the first 'script.src' and comment the second one
function initMap() {
    elMap = document.querySelector("gmp-map")
    gMap = new google.maps.Map(elMap, {
        zoom: elMap.zoom,
        center: {lat:29.557669, lng: 34.951923},
        mapId: elMap.mapId
    });

    console.log(gMap)
    gMap.addListener("click", (ev) => console.log(ev))
  }
window.initMap = initMap;


async function renderPlaces(){
    let places = await placeService.getPlaces()
    let html = ""
    places.forEach(place => {
        html += 
        `<li>
            <span>'${place.name}'</span>
            <button class="removeButton" onclick="app.onRemovePlace('${place.id}')">X</button>
            <button class="navigateButton" onclick="app.onNavigate('${place.id}')">Go</button>
        </li>
        `
    });

    const elList = document.querySelector("ul")
    elList.innerHTML = html
}


async function onRemovePlace(placeId){
    await placeService.removePlace(placeId)
    renderPlaces()
}

function onNavigate(placeId){
    console.log("nav")
}


function _onMapClick(ev){
    const name = prompt("Place Name?", "Place 1")
    const lat = ev.latLng.lat()
    const lng = ev.latLng.lng()
    placeService.addPlace(lat, lng, name, gMap.getZoom())
    renderPlaces()
}