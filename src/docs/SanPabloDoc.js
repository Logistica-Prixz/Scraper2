const AbstractDoc = require("./AbstractDoc");
const searchURL = 'https://www.farmaciasanpablo.com.mx/search/?text=';

const SanPabloProduct = require('../products/SanPabloProduct');

module.exports = class SanPabloDoc extends AbstractDoc {
    constructor(ean) {
        super(ean);
    }
    get price() {
        var p = new SanPabloProduct(this._content);
        return parseFloat(p.price);

    }
    get docUrl() {
        return searchURL + this._ean;
    }
}