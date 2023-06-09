const api_key='api_key=978e25189e4be9b4195a7896b24478c6';
const base_url='https://api.themoviedb.org/3';
const api_url=base_url+'/discover/movie?sort_by=popularity.desc&'+api_key;
const img_url='https://image.tmdb.org/t/p/w500';
const search_url=base_url+'/search/movie?'+api_key;

const main=document.getElementById('boxes');
const form=document.getElementById('but');
const search=document.getElementById('search');

getMovies(api_url);

function getMovies(url){
    fetch(url).then(res =>res.json()).then(data =>{console.log(data.results);
        showmovies(data.results);   
           });
}

function showmovies(data) {
main.innerHTML='';
    data.forEach(box=>{
        const {poster_path,vote_average,title,overview}=box;
        const movie=document.createElement('div');
        movie.classList.add('box');
        movie.innerHTML=`
        <img id="dummy" src="${img_url+poster_path}" height='100%' width='100%' alt="${title}" >
        <span  id='rating' class='${getcolor(vote_average)}'><h2 id='va'>${vote_average}</h2></span>
        <div class='title'><h2>${title}</h2></div>
        <div class="overview" id="overview">${overview}</div>
        
        `

       main.appendChild(movie);
    })
}

function getcolor(vote){
    if(vote>=8){
        return 'green'
    }else if(vote>=5){
        return 'orange'
    }else{
        return 'red'
    }
}


form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const searchTerm=search.value;

    if(searchTerm){
        getMovies(search_url+'&query='+searchTerm)
    }else{
        getMovies(api_url)
    }
})


