const AbstractScrap = require('./AbstractScrap');
const SanPabloDoc = require('../docs/SanPabloDoc');

module.exports = class SanPabloScrap extends AbstractScrap {
    _name = 'SanPabloScrap';
    _docClass = SanPabloDoc;

    _collectionWriteObj(price) {
        return { "$set": { "prices.sanpablo": price } };
    }
};