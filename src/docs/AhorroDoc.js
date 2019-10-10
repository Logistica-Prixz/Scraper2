const AbstractDoc = require("./AbstractDoc");
const AhorroProduct = require('../products/AhorroProduct');
const searchURL = 'https://www.fahorro.com/catalogsearch/result/?q=';


module.exports = class AhorroDoc extends AbstractDoc {
    _productClass = AhorroProduct;
    get docUrl() {
        return searchURL + this._ean;
    }
}