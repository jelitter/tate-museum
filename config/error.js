require('console-stamp')(console);

function handleError(res, err) {
    console.error('DB error:', JSON.stringify(err, null, 2));
    if (res)
    res.status(500).render("../views/partials/error.ejs", {
        error: 500,
        errorMessage: err.message
    });
}

module.exports = handleError;