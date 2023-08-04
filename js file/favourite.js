import createNaveBar from '../components/naveBar.js'
window.addEventListener("load",function () {
    document.querySelector('nav').append(createNaveBar({pageTitle:"Favourite"}));
})



function reFactorStr(str) {
    if (str.length>15) {
        str=str.slice(0,10)+'...';
        return str;
    }
    return str;
}

function removeFromLists(arr,imdbID) {
    let index=arr.findIndex((value)=>value.imdbID===imdbID);
    if (index!==-1) {
        arr.splice(index,1);
    }

}

function createCard(data) {
    let container=document.createElement('div');
    let imgContainer=document.createElement('div');
    let Poster=document.createElement('img');
    let imgNotAvailable=document.createElement('img');
    let movieDetailsContainer=document.createElement('div');
    let titleContainer=document.createElement('div');
    let title=document.createElement('p');
    let yearContainer=document.createElement('div');
    let year=document.createElement('p');
    let btnContainer=document.createElement('div');
    let movieDetailsBtn=document.createElement('button');
    let removeBtn=document.createElement('button');

    container.className='card';
    Poster.className='card-img'
    imgContainer.className='card-img-conitainer';
    movieDetailsContainer.className='movie-details flex';
    btnContainer.className='btn-container';
    movieDetailsBtn.className='movie-details-btn btn';
    removeBtn.className='remove-btn btn';

    title.innerHTML= reFactorStr(data.Title);
    year.innerHTML='Year' +' '+data.Year;
    Poster.src=data.Poster;
    imgNotAvailable.style.display='none'
    Poster.setAttribute('alt',data.Title);
    movieDetailsBtn.innerHTML='<i class="fa-solid fa-circle-info"></i> Movie Details';
    removeBtn.innerHTML='<i class="fa-solid fa-heart"></i> Remove'

    titleContainer.append(title);
    yearContainer.append(year);
    movieDetailsContainer.append(titleContainer,yearContainer);
    btnContainer.append(movieDetailsBtn,removeBtn);
    imgContainer.append(Poster);
    container.append(imgContainer,imgNotAvailable,movieDetailsContainer,btnContainer);

    movieDetailsBtn.addEventListener('click',function () {
        localStorage.setItem('imdbID',data.imdbID);
        window.location.href='./movieDetail.html'
    })
    removeBtn.addEventListener('click')

    return container;
}

function createMoviesLists(data) {
    let searchContainer=document.getElementsByClassName('favourite-main-container')[0];
    searchContainer.innerHTML='';
    for (let index = 0; index <data?.length; index++) {
        let card=createCard(data[index]);
        searchContainer.append(card);
    }
}

function fetchFavouriteLIists() {
    let lists=localStorage.getItem('favouriteLists');
    lists=JSON.parse(lists)
    if (!lists || !Array.isArray(lists) ||lists.length===0) {
        window.location.href = "./home.html";
    }
    createMoviesLists(lists);
}

fetchFavouriteLIists();