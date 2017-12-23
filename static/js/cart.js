$(document).ready(setSpinners);

function setSpinners() {
    console.log('spinners!');
    let spinners = $("[id^=input-spinner]")
    for (s of spinners) {

        let itemId = $(s).attr('id').match(/\d{2,}/)[0];
        let input = $('#input-spinner-' + itemId)
        let cartButton = $('#add-cart-' + itemId)

        $('#btn-up-' + itemId).on('click', function() {
            input.val(parseInt(input.val(), 10) + 1);
        });
        $('#btn-down-' + itemId).on('click', function() {
            input.val(parseInt(input.val(), 10) - 1);
        });

        cartButton.on('click', () => {
            let quantity = $('#input-spinner-' + itemId).val();
            console.log('clicked');
            $.post('/cart/', { itemId, quantity }, (data) => {
                console.log(JSON.stringify(data));
            }, 'json');
        });
    }
}

function addToCart(itemId) {
    let quantity = $('#input-spinner-' + itemId).val();

    $.post('/cart/', { itemId, quantity }, (data) => {
        console.log(JSON.stringify(data));
    }, 'json');
}