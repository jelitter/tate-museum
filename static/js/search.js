const MAX_PAGES = 4000;
const MAX_RESULTS = 12;

const animDuration = "0.3s";
const buttonSearch = document.getElementById('button-search');
const inputSearch = document.getElementById('input-search');

// function typeSearch() {
//     $('#button-search').attr("disabled", (inputSearch.value.length < 3));
// }

function search(page = 1) {

    let query = inputSearch.value.trim();
    let filter = document.getElementById('order-by').value.toLowerCase().trim();
    let orderBy = '';

    if (query == '') {
        page = Math.floor(Math.random() * MAX_PAGES);
    }

    if (filter.includes('title')) {
        orderBy = 'title';
    } else if (filter.includes('artist')) {
        orderBy = 'artist';
    } else {
        orderBy = 'medium';
    }


    // Leaving cards
    $('#card-deck > div > div').each(function(index) {
        $(this).css({
            "animation-name": "fadeOut",
            "animation-duration": "0.2s",
            "animation-timing-function": "easeIn"
        });
    });

    $.post('/shop/search/', {
        query,
        page,
        orderBy
    }, (htmldata) => {

        $('#card-container').html(htmldata);
        setQuantityControls(); // In shop.js
        setCardstyles();

    }, 'html');
}