// import { getArtwork, Artwork } from '../../models/Artwork';


const buttonSearch = document.getElementById('button-search');
const inputSearch = document.getElementById('input-search');

function search() {
    let query = inputSearch.value.trim();

    $.post('/artwork/search/', { query }, (htmldata) => {
        console.log(htmldata.length, ' items found for', query);
        $('#card-container').html(htmldata);
    }, 'html');
}