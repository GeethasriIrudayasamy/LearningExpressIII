const fs = require("fs");
const path = require("path");

const p = path.join(
    path.dirname(process.mainModule.filename),
    "data",
    "products.json"
);

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile((products) => {
            if (this.id) {
                const existingProductIndex = products.findIndex(
                    (product) => product.id === this.id
                );
                let updatedProducts;
                updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
        });
    }

    static findById(id, cb) {
        getProductsFromFile((products) => {
            const product = products.find((product) => product.id === id);
            cb(product);
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static deleteProductById(id) {
        getProductsFromFile((products) => {
            const productToDeleteIndex = products.findIndex(
                (product) => product.id === id
            );
            let updatedProducts = [...products];
            updatedProducts.splice(productToDeleteIndex, 1);
            fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                console.log(err);
            });
        });
    }
};
