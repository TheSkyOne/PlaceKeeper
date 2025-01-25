import { genId } from "./utils.service.js"

export const placeService = {
    getPlaces,
    removePlace
}


let gPlaces = []

_createPlaces()


function removePlace(placeId){
    var placeIdx = _getPlaceIndexById(placeId)
    gPlaces.splice(placeIdx, 1)
}


function getPlaces(){
    return gPlaces
}


function _createPlace(lat, lng, name){
    return {
        id: genId(),
        lat,
        lng,
        name 
    }
}


function _createPlaces(){
    var lat = 1
    var lng = 1
    for(let i = 0; i < 5; i++){
        let place = _createPlace(lat, lng, `name${lat}${lng}`)
        gPlaces.push(place)

        lat++
        lng++
    }

}


function _getPlaceById(placeId){
    return gPlaces.find((place) => place.id == placeId)
}


function _getPlaceIndexById(placeId){
    return gPlaces.findIndex((place) => place.id == placeId)
}