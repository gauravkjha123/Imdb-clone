function addStyle() {
    let head=document.querySelector("head");
    let link=document.createElement('link');
    let link2=document.createElement('link');
    link.rel="stylesheet";
    link2.rel="stylesheet";
    link.href="../css file/navBar.css"
    link2.rel="stylesheet";
    link2.href="../css file/loader.css"
    head.append(link,link2);
}

export default function createNaveBar({pageTitle='Home'}) {
    addStyle()
    let navContainer=document.createElement('div');
    let homeContainer=document.createElement('div');
    let homeTextContainer=document.createElement('span');
    let searchContainer=document.createElement('div');
    let searchInput=document.createElement('input');
    let favouriteContainer=document.createElement('div');
    let favouriteTextContainer=document.createElement('span');

    navContainer.className='flex nav-container';
    homeContainer.className='nav-item home-container hover';
    searchContainer.className='nav-item search-container';
    favouriteContainer.className='nav-item favourite-container hover';
    homeTextContainer.className='nav-text';
    favouriteTextContainer.className='nav-text';

    homeTextContainer.innerHTML="Home";
    favouriteTextContainer.innerHTML="Favourite";
    
    homeContainer.innerHTML='<i class="fa-solid fa-house"></i>';
    favouriteContainer.innerHTML='<i class="fa-solid fa-heart"></i>';

    homeContainer.append(homeTextContainer);
    searchContainer.append(searchInput);
    favouriteContainer.append(favouriteTextContainer);

    switch (pageTitle) {
        case 'Home':
            homeContainer.className+=" active"
            break;
        case 'Favourite':
            favouriteContainer.className+=" active"
            break;
        default:
            break;
    }
    navContainer.append(homeContainer,searchContainer,favouriteContainer);   
    
    homeContainer.addEventListener("click",function (event) {
        let homeText=document.querySelector('.home-container>span').innerHTML;
        let titleText=document.querySelector("title").innerHTML;
        if (homeText!==titleText) {
            window.location.href='../html file/home.html'        }
        return;
    })
    favouriteContainer.addEventListener("click",function (event) {
        let favouriteText=document.querySelector('.favourite-container>span').innerHTML;
        let titleText=document.querySelector("title").innerHTML;
        if (favouriteText!==titleText) {
            window.location.href='../html file/favourite.html'
        }
        return;
    })

    let scrollFlag=false;
    window.addEventListener('scroll',function () {
        if (this.scrollY >20 && !scrollFlag) {
            navContainer.classList.add("scroll");
            scrollFlag=true;
        }else if(this.scrollY<=20){
            navContainer.classList.remove("scroll");
            scrollFlag=false;
        }
    })

    return navContainer;    
}