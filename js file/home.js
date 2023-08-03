import createNaveBar from '../components/createNaveBar.js'
window.addEventListener("load",function () {
    document.querySelector('nav').append(createNaveBar({pageTitle:"Home"}));
    let input=document.querySelector("input");
    input.addEventListener("keyup",dibouncer);
})
async function fetchMovies() {
    let searchText=this.value;
    if(!searchText){
        searchText="trending"
    }
    const res =await fetch(`http://www.omdbapi.com/?s=${searchText}&apikey=54335d88&page=1`);
    const data = await res.json();
    createMoviesLists(data.Search);
    console.log(data);
    return data;
}
function Wrapper(fn,delay) {
    let id;
    return function(){
    let context=this;
    let args=arguments;
       id && clearTimeout(id);
       id= setTimeout(() => {
            fn.call(context,args)
        }, delay);
    }
}
const dibouncer=Wrapper(fetchMovies,300);

function reFactorStr(str) {
    if (str.length>15) {
        str=str.slice(0,6)+'...';
        return str;
    }
    return str;
}

function createCard(data) {
    let container=document.createElement('div');
    let Poster=document.createElement('img');
    let movieDetailsContainer=document.createElement('div');
    let titleContainer=document.createElement('div');
    let title=document.createElement('p');
    let yearContainer=document.createElement('div');
    let year=document.createElement('p');
    let btnContainer=document.createElement('div');
    let movieDetailsBtn=document.createElement('button');
    let addToFavouriteBtn=document.createElement('button');

    container.className='card';
    Poster.className='card-img';
    movieDetailsContainer.className='movie-details flex';
    btnContainer.className='btn-container';
    movieDetailsBtn.className='movie-details-btn btn';
    addToFavouriteBtn.className='favourite-btn btn';

    title.innerHTML= reFactorStr(data.Title);
    year.innerHTML='Year' +' '+data.Year;
    Poster.src=data.Poster;
    movieDetailsBtn.innerHTML='<i class="fa-solid fa-circle-info"></i> Movie Details';
    addToFavouriteBtn.innerHTML='<i class="fa-solid fa-heart"></i> Favourite'

    titleContainer.append(title);
    yearContainer.append(year);
    movieDetailsContainer.append(titleContainer,yearContainer);
    btnContainer.append(movieDetailsBtn,addToFavouriteBtn);
    container.append(Poster,movieDetailsContainer,btnContainer);

    return container;
}

function createMoviesLists(data) {
    let searchContainer=document.getElementsByClassName('search-list-container')[0];
    searchContainer.innerHTML='';
    for (let index = 0; index <data.length; index++) {
        let card=createCard(data[index]);
        searchContainer.append(card);
    }
}