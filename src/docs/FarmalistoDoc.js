const AbstractDoc = require("./AbstractDoc");
const FarmalistoProduct = require('../products/FarmalistoProduct');
const searchURL = 'https://www.farmalisto.com.mx/resultados?s=';
module.exports = class FarmalistoDoc extends AbstractDoc {
    _productClass = FarmalistoProduct;
    get docUrl() {
        return searchURL + this._ean;
    }
}