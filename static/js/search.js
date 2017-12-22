// import { getArtwork, Artwork } from '../../models/Artwork';


const buttonSearch = document.getElementById('button-search');
const inputSearch = document.getElementById('input-search');

function typeSearch() {
    $('#button-search').attr("disabled", (inputSearch.value.length < 3));
}

function search() {
    let query = inputSearch.value.trim();

    $.post('/artwork/search/', { query }, (htmldata) => {
        console.log(htmldata.length, ' items found for', query);
        $('#card-container').html(htmldata);
        setSpinners();
    }, 'html');
}