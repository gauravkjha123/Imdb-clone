import createNaveBar from '../components/createNaveBar.js'
window.addEventListener("load",function () {
    document.querySelector('nav').append(createNaveBar({pageTitle:"Favourite"}));
})