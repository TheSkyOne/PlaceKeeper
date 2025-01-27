import { genId, saveToStorage, loadFromStorage } from "./utils.service.js"
import { storageService } from "./storage.service.js"

export const placeService = {
    getPlaces,
    addPlace,
    removePlace
}

const SOTRAGE_KEY = "places"

let gPlaces = []

_createPlaces()


function getPlaces(){
    return storageService.query(SOTRAGE_KEY)
}


function addPlace(lat, lng, name, zoom){
    var newPlace = _createPlace(lat, lng, name)
    return storageService.post(SOTRAGE_KEY, newPlace)
    // gPlaces.push(newPlace)
}


function removePlace(placeId){
    return storageService.remove(SOTRAGE_KEY, placeId)
    // var placeIdx = _getPlaceIndexById(placeId)
    // gPlaces.splice(placeIdx, 1)
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
    gPlaces = loadFromStorage(SOTRAGE_KEY) || []
    if(gPlaces && gPlaces.length) return // already had places in storage

    var lat = 1
    var lng = 1
    for(let i = 0; i < 5; i++){
        gPlaces.push(_createPlace(lat, lng, `demo place ${i}`))
    }

    saveToStorage(SOTRAGE_KEY, gPlaces)

}


function _getPlaceById(placeId){
    return gPlaces.find((place) => place.id == placeId)
}


function _getPlaceIndexById(placeId){
    return gPlaces.findIndex((place) => place.id == placeId)
}