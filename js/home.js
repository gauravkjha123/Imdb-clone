import createNaveBar from "../components/naveBar.js";
import creatLoader from "../components/loder.js";

window.addEventListener("load", function () {
  document.querySelector("nav").append(createNaveBar({ pageTitle: "Home" }));
  let input = document.querySelector("input");
  input.addEventListener("keyup", dibouncer);
});
async function fetchMovies() {
  let searchContainer = document.getElementsByClassName(
    "search-list-container"
  )[0];
  creatLoader(searchContainer, true);
  let searchText = this?.value;
  if (!searchText) {
    searchText = "trending";
  }
  const res = await fetch(
    `http://www.omdbapi.com/?s=${searchText}&apikey=54335d88&page=1`
  );
  const data = await res.json();
  createMoviesLists(data.Search, searchContainer);
  console.log(data);
  return data;
}
function Wrapper(fn, delay) {
  let id;
  return function () {
    let context = this;
    let args = arguments;
    id && clearTimeout(id);
    id = setTimeout(() => {
      fn.call(context, args);
    }, delay);
  };
}
const dibouncer = Wrapper(fetchMovies, 300);

function reFactorStr(str) {
  if (str.length > 15) {
    str = str.slice(0, 10) + "...";
    return str;
  }
  return str;
}

function isExist(arr, imdbID) {
  let data = arr.filter((value) => value.imdbID === imdbID);
  return data.length > 0 ? true : false;
}
function createCard(data) {
  let container = document.createElement("div");
  let imgContainer = document.createElement("div");
  let Poster = document.createElement("img");
  let imgNotAvailable = document.createElement("img");
  let movieDetailsContainer = document.createElement("div");
  let titleContainer = document.createElement("div");
  let title = document.createElement("p");
  let yearContainer = document.createElement("div");
  let year = document.createElement("p");
  let btnContainer = document.createElement("div");
  let movieDetailsBtn = document.createElement("button");
  let addToFavouriteBtn = document.createElement("button");

  container.className = "card";
  Poster.className = "card-img";
  imgContainer.className = "card-img-conitainer";
  movieDetailsContainer.className = "movie-details flex";
  btnContainer.className = "btn-container";
  movieDetailsBtn.className = "movie-details-btn btn";
  addToFavouriteBtn.className = "favourite-btn btn";

  title.innerHTML = reFactorStr(data.Title);
  year.innerHTML = "Year" + " " + data.Year;
  Poster.src = data.Poster;
  imgNotAvailable.style.display = "none";
  Poster.setAttribute("alt", data.Title);
  movieDetailsBtn.innerHTML =
    '<i class="fa-solid fa-circle-info"></i> Movie Details';
  addToFavouriteBtn.innerHTML = '<i class="fa-solid fa-heart"></i> Favourite';

  titleContainer.append(title);
  yearContainer.append(year);
  movieDetailsContainer.append(titleContainer, yearContainer);
  btnContainer.append(movieDetailsBtn, addToFavouriteBtn);
  imgContainer.append(Poster);
  container.append(
    imgContainer,
    imgNotAvailable,
    movieDetailsContainer,
    btnContainer
  );

  movieDetailsBtn.addEventListener("click", function () {
    localStorage.setItem("imdbID", data.imdbID);
    window.location.href = "./movieDetail.html";
  });
  addToFavouriteBtn.addEventListener("click", function (event) {
    let lists = localStorage.getItem("favouriteLists");
    if (!lists) {
      localStorage.setItem("favouriteLists", JSON.stringify([data]));
    } else {
      lists = JSON.parse(lists);
      if (!isExist(lists, data.imdbID)) {
        lists.push(data);
        localStorage.setItem("favouriteLists", JSON.stringify(lists));
      } else {
        alert(`${data.Title} is already exist in favourite lists`);
        return;
      }
    }
    alert(`You have added ${data.Title} in favourite lists`);
  });
  return container;
}

function createMoviesLists(data, target) {
  creatLoader(target, false);
  target.innerHTML = "";
  for (let index = 0; index < data?.length; index++) {
    let card = createCard(data[index]);
    target.append(card);
  }
}

fetchMovies();
