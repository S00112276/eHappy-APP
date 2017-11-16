'use strict';

module.exports = function(app) {
    var transactions = require('../controllers/TransactionsController');

    // transactions Routes
    app.route('/confirmation')
        .post(transactions.addTransaction)
        .get(transactions.showAllTransactions);
}