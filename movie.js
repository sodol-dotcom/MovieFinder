const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzBhOWE5MTliNTExMDU5MzJmMTdiYjJiNzU1NDZhNCIsIm5iZiI6MTcyMjE0MDY2OS40MTEwNjQsInN1YiI6IjY2YTViM2ExOTJmOGVkNDE2YTQwYWY2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QFhkBq-ugMVzt4h_d_srNYa6WCPHkek_6qGWXaxp5SI'
    }
};

const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1'

// API 데이터 가져오기
fetch(url, options)
    .then(response => response.json())
    .then(data => {
        displayMovies(data.results);
    })
    .catch(err => console.error(err));

function displayMovies(movies) {
    const cardList = document.querySelector('.card-list');
    cardList.innerHTML = '';

    movies.forEach((a) => {
        let _title = a['title'];
        let _overview = a['overview'];
        let _poster_path = a['poster_path'];
        let _vote_average = a['vote_average'];
        let _id = a['id'];

        let temp_html = `
           <div class="col">
               <div class="movie-card" data-id="${_id}">
                   <img src="https://image.tmdb.org/t/p/w200${_poster_path}" alt="${_title}">
                   <h3>${_title}</h3>
                   <p>${_overview}</p>
                   <p>Rating: ${_vote_average}</p>
               </div>
           </div>
        `;
        cardList.insertAdjacentHTML('beforeend', temp_html);
    });

    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach(card => {
        card.addEventListener('click', function () {
            let movieId = this.getAttribute('data-id');
            alert(`영화 id: ${movieId}`);
        });
    });
}

function handleSearch(event) {
    event.preventDefault();
    const query = document.getElementById('search-input').value.toLowerCase();

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            const searchResults = data.results;
            let title_list = searchResults.map(item => item.title.toLowerCase());
            let find_title = title_list.filter(item => item.includes(query));
            let find_index = [];

            for (let i in find_title) {
                let idx = title_list.findIndex(item => item === find_title[i]);
                find_index.push(idx);
            }

            if (find_index.length === 0) {
                alert('검색 결과가 없습니다.');
            } else {
                const match_movie = find_index.map(idx => searchResults[idx]);
                displayMovies(match_movie);
            }
        })
        .catch(err => console.error(err));
}
