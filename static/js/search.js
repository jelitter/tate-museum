// import { getArtwork, Artwork } from '../../models/Artwork';


const buttonSearch = document.getElementById('button-search');
const inputSearch = document.getElementById('input-search');

function typeSearch() {
    $('#button-search').attr("disabled", (inputSearch.value.length < 3));
}

function search(page = 1) {
    let query = inputSearch.value.trim();

    $.post('/shop/search/', { query,page }, (htmldata) => {
        console.log(htmldata.length, ' items found for', query);
        $('#card-container').html(htmldata);
        setSpinners();
    }, 'html');
}