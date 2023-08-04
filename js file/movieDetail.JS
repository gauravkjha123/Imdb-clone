import createNaveBar from "../components/naveBar.js";
import creatLoader from '../components/loder.js'

window.addEventListener("load", function () {
  document.querySelector("nav").append(createNaveBar({ pageTitle: "" }));
  fetchMovies();
});

async function fetchMovies() {
    let mainContainer = document.getElementsByClassName(
        "movieDetail-main-container"
      )[0];
    creatLoader(mainContainer,true);
  let imdbID = localStorage.getItem("imdbID");
  if (!imdbID) {
    window.location.href = "./home.html";
  }
  try {
    const res = await fetch(
      `http://www.omdbapi.com/?i=${imdbID}&apikey=54335d88&page=1&type=movie&plot=full`
    );
    const data = await res.json();
    creatLoader(mainContainer,false);
    createMovieDetails(data);
    return data;
  } catch (error) {
    window.location.href = "./home.html";
  }
}

function createMovieDetails(data) {
  if (!data) {
    window.location.href = "./home.html";
  }
  let mainContainer = document.getElementsByClassName(
    "movieDetail-main-container"
  )[0];

  let container = document.createElement("div");
  let imgContainer = document.createElement("div");
  let bImgContainer = document.createElement("div");
  let bImg = document.createElement("img");
  let mImgContainer = document.createElement("div");
  let mImg = document.createElement("img");
  let titleContainer = document.createElement("div");
  let titleTextContainer = document.createElement("div");
  let title = document.createElement("span");
  let ratingContainer = document.createElement("div");
  let rating = document.createElement("span");
  let movieDetail = document.createElement("div");
  let plot = document.createElement("p");
  let releaseDate = document.createElement("p");
  let runTime = document.createElement("p");
  let genre = document.createElement("p");

  container.className = "movie-detail-container";
  imgContainer.className = "img-container flex";
  bImgContainer.className = "backGround-img";
  mImgContainer.className = "main-img";
  titleContainer.className = "movie-detail-title flex";
  titleTextContainer.className = "title-text-container";
  ratingContainer.className = "rating-container";
  movieDetail.className = "movie-detail";

  bImg.src = data?.Poster;
  mImg.src = data?.Poster;

  bImg.setAttribute("alt", data?.Title);
  mImg.setAttribute("alt", data?.Title);

  title.innerHTML = data?.Title;
  ratingContainer.innerHTML = ' <i class="fa-solid fa-star"></i> ';
  rating.innerHTML = data?.imdbRating;
  plot.innerHTML = `Plot : ${data?.Plot}`;
  releaseDate.innerHTML = `Release date : ${data?.Released}`;
  runTime.innerHTML = `Runtime : ${data?.Runtime}`;
  genre.innerHTML = `Genre : ${data?.Genre}`;

  bImgContainer.append(bImg);
  mImgContainer.append(mImg);
  imgContainer.append(bImgContainer, mImgContainer);
  titleTextContainer.append(title);
  ratingContainer.append(rating);
  titleContainer.append(titleTextContainer, ratingContainer);
  movieDetail.append(plot, releaseDate, runTime, genre);
  container.append(imgContainer, titleContainer, movieDetail);
  mainContainer.appendChild(container);
}
