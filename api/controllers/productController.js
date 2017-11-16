'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Products');

// Returns all products 
exports.list_all_products = function (req, res) {
    Product.find({}, function (err, product) {
        if (err)
            res.send(err);
        res.json(product);
    });
};

// Creates a product
exports.create_a_product = function (req, res) {
    var new_product = new Product(req.body);
    new_product.save({}, function (err, product) {
        if (err)
            res.send(err);
        res.json(product);
    });
};

// Returns a product based on _id
exports.read_a_product = function (req, res) {
    Product.findById(req.params.productId, function (err, product) {
        if (err)
            res.send(err);
        res.json(product);
    });
};

// Updates an existing product based on _id
exports.update_a_product = function (req, res) {
    Product.findOneAndUpdate({ _id: req.params.productId }, req.body,
        { new: true }, function (err, product) {
            if (err)
                res.send(err);
            res.json(product);
        });
};

// Delete a product based on _id
exports.delete_a_product = function (req, res) {
    Product.findOneAndRemove({productId:req.params.productId},
         function (err, product) {
        if (err)
            res.send(err);
        res.json(product);
    });
};