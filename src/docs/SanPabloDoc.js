const AbstractDoc = require("./AbstractDoc");
const SanPabloProduct = require('../products/SanPabloProduct');
const searchURL = 'https://www.farmaciasanpablo.com.mx/search/?text=';


module.exports = class SanPabloDoc extends AbstractDoc {
    _productClass = SanPabloProduct;
    get docUrl() {
        return searchURL + this._ean;
    }
}