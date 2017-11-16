'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    Created_date: {
        type: Date,
        default: Date.now
    },
    productId: {
        type: Number,
        Required: 'Enter the ID of the product'
    },
    productName: {
        type: String,
        default: 'name'
    },
    productCode: {
        type: String,
        default: 'code'
    },
    releaseDate: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
        default: 0
    },
    imageUrls: {
        type: [String],
        default: 'URL'
    }
});

module.exports = mongoose.model('Products', ProductSchema);