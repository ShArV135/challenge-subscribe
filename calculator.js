class Calculator {
    constructor() {
        this.products = [];
    }

    addProduct(product) {
        this.products.push(product);
    }

    totalPrice() {
        return this.products.reduce((sum, product) => sum + product.priceWithTax(), 0);
    }

    taxValue() {
        return this.products.reduce((sum, product) => sum + product.taxValue(), 0);
    }
}

class Product {
    constructor(title, amount, price, noTax, imported) {
        this.title = title;
        this.amount = amount;
        this.price = price;
        this.noTax = noTax;
        this.imported = imported;
    }

    taxRatio() {
        let ratio = 1;

        if (!this.noTax) {
            ratio += 0.1;
        }

        if (this.imported) {
            ratio += 0.05;
        }

        return ratio;
    }

    totalPrice() {
        return this.amount * this.price;
    }

    priceWithTax() {
        return this.totalPrice() * this.taxRatio();
    }

    taxValue() {
        let value = this.priceWithTax() - this.totalPrice();
         value = Math.round(value / 0.05) * 0.05;

        return value;
    }
}
