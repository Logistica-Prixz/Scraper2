const AbstractProduct = require('./AbstractProduct');
module.exports = class AhorroProduct extends AbstractProduct {

    get price() {
        if (this.$) {
            var el = this._cheerio.text(this.$('.regular-price .price')).trim().match(/[0-9]+,?[0-9]*\.?[0-9]+/g);
            if (match) {
                return parseFloat(match[0].split(',').join(''));
            }
        }
        return super.price;

    }
}