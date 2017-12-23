const usernameReg = document.getElementById('username-reg');
const passwordReg = document.getElementById('password-reg');
const passFeedback = document.getElementById('pass-feedback');

const usernameLogin = document.getElementById('username-login');
const passwordLogin = document.getElementById('password-login');



// Password validation for registering
function passVal() {
    const pwlen = passwordReg.value.length;
    const unlen = usernameReg.value.length;

    // Create button disabled if password shorter than 6 characters or username empty
    $('#button-create').attr("disabled", (pwlen < 6 || unlen == 0));

    if (pwlen < 6)
        passFeedback.innerHTML = '<div class="mt-3 alert alert-danger" role="alert"><small>Password too short (min. 6 characters)</small></div>';
    else if (pwlen < 10)
        passFeedback.innerHTML = '<div class="mt-3 alert alert-warning" role="alert"><small>Password strengh OK</small></div>';
    else
        passFeedback.innerHTML = '<div class="mt-3 alert alert-success" role="alert"><small>Password strengh great!</small></div>';
}


function loginVal() {
    const unlen = usernameLogin.value.length;
    const pwlen = passwordLogin.value.length;

    $('#button-login').attr("disabled", (pwlen == 0 || unlen == 0));
}