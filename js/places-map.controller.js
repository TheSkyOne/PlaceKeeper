import { placeService } from "./services/place.service.js";


window.app = {
    onLoad,
    onRemovePlace,
    onNavigate
}


function onLoad(){
    renderPlaces()
}


function renderPlaces(){
    let html = ""
    let places = placeService.getPlaces()
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


function onRemovePlace(placeId){
    placeService.removePlace(placeId)
    renderPlaces()
}

function onNavigate(placeId){
    console.log("nav")
}