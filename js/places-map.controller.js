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
}

//called as callback from the script that loads the google maps library
function initMap() {
    elMap = document.querySelector(".map-container")
    gMap = new google.maps.Map(elMap, {
        zoom: 13,
        center: {lat:29.557669, lng: 34.951923},
        mapId: "DEMO_MAP_ID"
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