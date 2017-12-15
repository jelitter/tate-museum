require('console-stamp')(console);

function handleError(res, err) {
    // console.error('DB error:', JSON.stringify(err, null, 2));
    console.error('DB error:', err.message);
    if (res)
        res.status(500).render("../views/partials/error.ejs", {
            cache: true,
            error: 500,
            errorMessage: err.message
        });
}

module.exports = handleError;