require('console-stamp')(console);

function handleError(err) {
    console.error('DB error:', JSON.stringify(err, null, 2));
}

module.exports = handleError;