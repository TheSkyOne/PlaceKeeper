import { placeService } from "./services/place.service.js";


function onLoad(){
    renderPlaces()
}


function renderPlaces(){
    var lng = 1
    var lat = 1
    for(var i = 0; i < 2; i++){
        var place = placeService.createPlace(lng, lat, `name${lng}${lat}`)
        lng++
        lat++
    }
}

function onRemovePlace(placeId){

}