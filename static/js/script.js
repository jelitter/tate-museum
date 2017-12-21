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
        passFeedback.innerHTML = '<p class="text-danger">Password too short (min. 6 characters)</p>';
    else if (pwlen < 10)
        passFeedback.innerHTML = '<p class="text-warning">Password strengh OK</p>';
    else
        passFeedback.innerHTML = '<p class="text-success">Password strengh great!</p>';
}


function loginVal() {
    const unlen = usernameLogin.value.length;
    const pwlen = passwordLogin.value.length;

    $('#button-login').attr("disabled", (pwlen == 0 || unlen == 0));
}