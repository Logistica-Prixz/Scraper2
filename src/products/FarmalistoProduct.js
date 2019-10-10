const AbstractProduct = require('./AbstractProduct');
module.exports = class FarmalistoProduct extends AbstractProduct {

    get price() {
        if (this.$) {
            var el = this._cheerio.text(this.$('.product-price-and-shipping .price')).trim();
            var match = el.match(/[-+]?[0-9]*\.?[0-9]+/g);
            if (match) {
                return parseFloat(match[0]);
            }
        }
        return super.price;

    }
}