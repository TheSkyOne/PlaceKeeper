import { saveToStorage, loadFromStorage } from "./utils.service.js"

var userPrefs = {
    email : '',
    age : '18',
    "bg-color" : '',
    "txt-color" : '',
    "birth-date": '',
    "birth-time": ''
}

const storageKey = "user-prefs"

_applyUserPrefs()
_registerEvents()


function _registerEvents(){
    const inputEls = document.querySelectorAll("input")
    inputEls.forEach(elInput => {
        elInput.addEventListener("change", ev => {
            userPrefs[elInput.id] = elInput.value

            switch (elInput.id){
                case "age":
                    const elSpan = elInput.nextElementSibling
                    elSpan.textContent = elInput.value
                    break

                case "bg-color":
                    document.querySelector("body").style.backgroundColor = elInput.value
                    break

                case "txt-color":
                    document.querySelector("body").style.color = elInput.value
                    const linkEls = document.querySelectorAll("nav a")
                    linkEls.forEach(elLink => elLink.style.color = elInput.value)
                    break
            }
        })
    })

    document.querySelector("form").addEventListener("submit",
        ev => {
            saveToStorage(storageKey, userPrefs)
        })
}


function _applyUserPrefs(){
    userPrefs = loadFromStorage(storageKey) || userPrefs
    document.querySelector("#email").value = userPrefs.email
    document.querySelector("#age").value = userPrefs.age
    document.querySelector("#age-span").textContent = userPrefs.age

    document.querySelector("body").style.backgroundColor = userPrefs["bg-color"]
    document.querySelector("#bg-color").value = userPrefs["bg-color"]
    document.querySelector("body").style.color = userPrefs["txt-color"]
    document.querySelector("#txt-color").value = userPrefs["txt-color"]

    document.querySelector("#birth-date").value = userPrefs["birth-date"]
    document.querySelector("#birth-time").value = userPrefs["birth-time"]
}