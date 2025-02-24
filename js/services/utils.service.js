export function genId(length = 3) {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	var id = ''
    
	for (var i = 0; i < length; i++) {
		id += chars.charAt(_getRandomInt(0, chars.length))
	}
	return id
}


export function saveToStorage(key, val) {
    const strVal = JSON.stringify(val)
	localStorage.setItem(key, strVal)
}


export function loadFromStorage(key) {
	var val = localStorage.getItem(key)
	return JSON.parse(val)
}


function _getRandomInt(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}