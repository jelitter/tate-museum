$(document).ready(() => {
    setSpinners();
});


function setSpinners() {
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

            $.post('/cart/', { itemId, quantity }, (data) => {
                $('#card-' + itemId).append(`
                <div class="container alert alert-success alert-dismissible mt-2" role="alert">
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <small>Item added to cart!</small>
                </div>
                `);
            });
        });
    }
}