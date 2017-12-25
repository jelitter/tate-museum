// Shopping Cart

$(document).ready(() => {
    setQuantityControls();
    setEmptyCartButtons();
});

function setQuantityControls() {

    let qtyControls = $("[id^=btn-plus]")
    for (c of qtyControls) {

        let itemId = $(c).attr('id').match(/\d{2,}/)[0];
        let quantity = $('#quantity-' + itemId);
        let cartButton = $('#add-cart-' + itemId);

        $('#btn-remove-' + itemId).on('click', () => {
            alert('Add remove item here');
        });

        $('#btn-minus-' + itemId).on('click', function () {
            let qty = parseInt(quantity.text().trim(), 10) - 1;
            qty = qty < 1 ? 1 : qty;

            quantity.text(qty);
            if (qty == 1)
                $('#btn-minus-' + itemId).addClass("disabled");
            updateItemPrice(itemId, qty);
        });

        $('#btn-plus-' + itemId).on('click', function () {
            let qty = parseInt(quantity.text().trim(), 10) + 1;
            quantity.text(qty);
            if (qty == 2) {
                $('#btn-minus-' + itemId).removeClass("disabled");
            }

            updateCartItem(itemId, qty, (results) => {
                console.log('results:', results)
                updateItemPrice(itemId, qty);
            });
        });

        cartButton.on('click', () => {
            let quantity = parseInt($('#quantity-' + itemId).text().trim(), 10);

            $.post('/cart/', {
                itemId,
                quantity
            }, (data) => {
                $('#card-' + itemId).append(`
                <div class="container alert alert-success alert-dismissible mt-2" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <small>Item added to cart!</small>
                </div>
                `);

                // Update cart counter here
                $('#cart-items').text(parseInt($('#cart-items').text().trim(), 10) + 1);
            });
        });
    }
}

function updateItemPrice(itemId, qty) {
    let itemprice = parseFloat($('#item-price-' + itemId).text());
    let total = parseFloat($('#item-total-' + itemId).text());
    let newTotal = parseFloat(Math.round(itemprice * qty * 100) / 100).toFixed(2);

    console.log('New total: ', newTotal);

    if (newTotal != total) {
        $('#item-total-' + itemId).text(newTotal);

        let priceTotal = parseFloat($('#price-total-' + itemId).text());
        $('#price-total-' + itemId).text(newTotal);

    }
}


function updateCartItem(itemId, qty, callback) {

    let quantity = parseInt(qty);

    console.log('Requesting update of item', itemId, "to quantity", quantity);

    $.post('/cart/item', {
        itemId,
        quantity
    }, (data) => {
        console.log('Updated:', data);
        return data;

        // $('#card-' + itemId).append(`
        //         <div class="container alert alert-success alert-dismissible mt-2" role="alert">
        //             <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        //             <small>Item added to cart!</small>
        //         </div>
        //         `);

        // Update cart counter here
        // $('#cart-items').text(parseInt($('#cart-items').text().trim(), 10) + quantity);
    });

}

function emptyCart(callback) {
    $.ajax({
        url: '/cart/item',
        type: 'DELETE',
        success: (err, result) => {
            if (err)
                alert('Error emptying cart');
            else {
                alert('Cart emptied!\n' + result);
                location.href = '/cart';
            }
        }
    });
}

function setEmptyCartButtons() {
    $('.emptycart').each(function () {
        $(this).on('click', emptyCart);

    });
}