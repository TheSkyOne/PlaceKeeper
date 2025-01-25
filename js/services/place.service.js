import { genId } from "./utils.service.js"


let gPlaces = []


export const placeService = {
    createPlace,
    removePlace,
}


function createPlace(lat, lng, name){
    return {
        id: genId(),
        lat,
        lng,
        name 
    }
}


function removePlace(placeId){
    var placeIdx = getPlaceIndexById(placeId)
    gPlaces.splice(placeIdx, 1)
}


function getPlaceById(placeId){
    return gPlaces.find((place) => place.id == placeId)
}

function getPlaceIndexById(placeId){
    return gPlaces.findIndex((place) => place.id == placeId)
}