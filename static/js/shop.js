// Shop search results

$(document).ready(() => {
    setQuantityControls();
    setCardstyles();
});

function setQuantityControls() {

    let qtyControls = $("[id^=btn-plus]")
    for (c of qtyControls) {

        let itemId = $(c).attr('id').match(/\d{2,}/)[0];
        let quantity = $('#quantity-' + itemId)
        let addToCartButton = $('#add-cart-' + itemId)

        $('#btn-plus-' + itemId).on('click', function () {
            let qty = parseInt(quantity.text().trim(), 10);
            quantity.text(++qty);
            if (qty == 2)
                $('#btn-minus-' + itemId).removeClass("disabled");
        });

        $('#btn-minus-' + itemId).on('click', function () {
            let qty = parseInt(quantity.text().trim(), 10);
            quantity.text(qty == 1 ? 1: qty -1);
            if (qty == 2)
                $('#btn-minus-' + itemId).addClass("disabled");
        });

        addToCartButton.on('click', () => {
            let quantity = parseInt($('#quantity-' + itemId).text().trim(), 10);

            $.post('/cart/item', { itemId, quantity }, (data) => {
                $('#card-' + itemId).parent().append(`
                <div class="container alert alert-success alert-dismissible mt-4" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <small>Item added to cart!</small>
                </div>
                `);

                // Update cart counter here
                $('#cart-items').text(parseInt($('#cart-items').text().trim(), 10)+ quantity);
            });
        });
    }
}


function setCardstyles() {
    $('#card-deck > div > div').each(function (index) {

        // Incoming cards
        $(this).css({
            "box-shadow": "2px 2px 4px rgba(0, 0, 0, 0.5)",
            "animation-name": "zoomIn",
            "animation-duration": animDuration,
        });

        $(this).parent().css({
            "animation-name": "fadeIn",
            "animation-duration": animDuration,
        });

        $(this).hover(function () {
            $(this).css({
                "transform": "scale(1.03)"
            });
        }, function () {
            $(this).css({
                "transform": "scale(1)"
            });
        });
    });
}
