const animDuration = "0.3s";

const buttonSearch = document.getElementById('button-search');
const inputSearch = document.getElementById('input-search');

function typeSearch() {
    $('#button-search').attr("disabled", (inputSearch.value.length < 3));
}

function search(page = 1) {
    let query = inputSearch.value.trim();

    // Leaving cards
    $('#card-deck > div > div').each(function (index) {
        $(this).css({
            "animation-name": "fadeOut",
            "animation-duration": "0.2s",
            "animation-timing-function": "easeIn"
        });
    });

    $.post('/shop/search/', {
        query,
        page
    }, (htmldata) => {

        $('#card-container').html(htmldata);
        setQuantityControls(); // In shop.js

        setCardstyles();

    }, 'html');
}


