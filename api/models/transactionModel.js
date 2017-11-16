'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../../config/database');

// From http://mongoosejs.com/docs/schematypes.html
var ObjectId = mongoose.Schema.Types.ObjectId;
var Product = new Schema({ _id : ObjectId });

// Transaction Schema
const TransactionSchema = new Schema({
    user_id: {
        type: String,
        required: 'Enter user_id'
    },
    time: {
        type: Date,
        default: Date.now
    },
    total: {
        type: Number,
        required: 'Enter total amount'
    }//,
    //products: {
      //  Type: [Schema.Types.ObjectId],
       // required: 'Enter the products'
    //}
});

const Transaction = module.exports = mongoose.model('Transaction', TransactionSchema);