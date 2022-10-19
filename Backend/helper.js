function getOffset(currentPage = 1, listperPage) {
    return (currentPage - 1) * [listperPage];
}

function emptyOrRows(rows) {
    if (!rows) {
        return [];
    }
    return rows;
}

module.exports = {
    getOffset,
    emptyOrRows
}