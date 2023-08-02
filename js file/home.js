import createNaveBar from '../components/createNaveBar.js'
window.addEventListener("load",function () {
    document.querySelector('nav').append(createNaveBar({pageTitle:"Home"}));
    craeteMoviesList()
})
async function fetchMovies(searchText) {
    const res =await fetch(`http://www.omdbapi.com/?s=${searchText}&apikey=54335d88`);
    const data = await response.json();
    return data;
}

const dibouncer=()=>{

}

function craeteMoviesList() {
    let input=document.querySelector("input");
    let searchText=input.value;
    input.addEventListener("keyup",function () {
        searchText=input.value;
        console.log("this is search text=",searchText);
    })
}