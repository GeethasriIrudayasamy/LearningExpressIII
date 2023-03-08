const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fields]) => {
            res.render("shop/product-list", {
                prods: rows,
                pageTitle: "All Products",
                path: "/products",
            });
        })
        .catch((err) => console.log(err));
};

exports.getProductDetail = (req, res, next) => {
    const productId = req.params.productId;

    Product.findById(productId).then(([rows, fields]) => {
        res.render("shop/product-detail", {
            product: rows[0],
            pageTitle: rows[0].title,
            path: "/products",
        });
    });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fields]) => {
            res.render("shop/index", {
                prods: rows,
                pageTitle: "Shop",
                path: "/",
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.addToCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId)
        .then(([rows, fields]) => {
            console.log(rows);
        })
        .catch((err) => {
            console.log(err);
        });
    // Cart.addProduct(productId, product.price);

    res.redirect("/cart");
};

exports.getCart = (req, res, next) => {
    res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
    });
};

exports.getOrders = (req, res, next) => {
    res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
    });
};

exports.getCheckout = (req, res, next) => {
    res.render("shop/checkout", {
        path: "/checkout",
        pageTitle: "Checkout",
    });
};
