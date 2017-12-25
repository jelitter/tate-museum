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


        $('#btn-remove-' + itemId).on('click', () => {
            alert('Add remove item here');
        });

        $('#btn-minus-' + itemId).on('click', function () {
            let prevqty = parseInt(quantity.text().trim(), 10);
            qty = prevqty == 1 ? 1 : prevqty - 1;

            if (prevqty > 1) {
                quantity.text(qty);
                if (qty == 1)
                    $('#btn-minus-' + itemId).addClass("disabled");
                spinner(itemId);
                updateCartItem(itemId, qty, (err, results) => {
                    console.log('minus, results:', results)
                    updateItemPrice(itemId, qty);
                });
            }
        });

        $('#btn-plus-' + itemId).on('click', function () {
            let qty = parseInt(quantity.text().trim(), 10) + 1;
            quantity.text(qty);
            if (qty == 2) {
                $('#btn-minus-' + itemId).removeClass("disabled");
            }
            spinner(itemId);
            updateCartItem(itemId, qty, (err, results) => {
                if (err) throw err;
                console.log('plus, results:', results)
                updateItemPrice(itemId, qty);
            });
        });
    }
}

function updateItemPrice(itemId, qty) {
    let itemprice = parseFloat($('#item-price-' + itemId).text());
    let total = parseFloat($('#item-total-' + itemId).text());
    let newTotal = parseFloat(Math.round(itemprice * qty * 100) / 100).toFixed(2);

    $('#item-total-' + itemId).text(newTotal);


    let priceTotal = 0.00;
    let totals = $("[id^=item-total-]");

    for (t of totals) {
        let itemId = $(t).attr('id').match(/\d{2,}/)[0];
        priceTotal += parseFloat($('#item-total-' + itemId).text());
    }
    
    $('#price-total').text(priceTotal.toFixed(2));
}


function updateCartItem(itemId, qty, callback) {
    let quantity = parseInt(qty);

    $.post('/cart/item', {
        itemId,
        quantity
    }, (err, data, data2, data3) => {
        if (err) throw err;
        console.log('Updated:', err, data, data2, data3);
        callback();
    });
}

function emptyCart() {
    $.ajax({
        url: '/cart/item',
        type: 'DELETE',
        success: (err, result) => {
            location.href = '/cart';
        }
    });
}

function setEmptyCartButtons() {
    $('.emptycart').each(function () {
        $(this).on('click', emptyCart);
    });
}

function spinner(id) {
    $('#item-total-' + id).html('<span class="px-3"><i class="fa fa-spinner fa-spin fa-fw"></i></span>');
    $('#price-total').html('<span class="px-4"><i class="fa fa-spinner fa-spin fa-fw"></i></span>');
}