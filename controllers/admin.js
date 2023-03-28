const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    res.render("admin/edit-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product",
        editing: false,
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    req.user
        .createProduct({
            title: title,
            imageUrl: imageUrl,
            price: price,
            description: description,
        })
        .then(() => res.redirect("/products"));
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect("/");
    }
    const productId = req.params.productId;

    Product.findByPk(productId).then((product) => {
        if (!product) {
            res.redirect("/");
        } else {
            res.render("admin/edit-product", {
                pageTitle: "Edit Product",
                path: "/admin/edit-product",
                editing: editMode,
                product: product,
            });
        }
    });
};

exports.postEditProduct = (req, res, next) => {
    const productId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;

    Product.update(
        {
            title: updatedTitle,
            imageUrl: updatedImageUrl,
            description: updatedDescription,
            price: updatedPrice,
        },
        { where: { id: productId } }
    ).then(() => {
        res.redirect("/admin/products");
    });
};

exports.getProducts = (req, res, next) => {
    req.user
        .getProducts()
        .then((products) => {
            res.render("admin/products", {
                prods: products,
                pageTitle: "Admin Products",
                path: "/admin/products",
            });
        })
        .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.destroy({ where: { id: productId } }).then(() => {
        return res.redirect("/admin/products");
    });
};
