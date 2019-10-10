const AbstractScrap = require('./AbstractScrap');
const AhorroDoc = require('../docs/AhorroDoc');

module.exports = class AhorroScrap extends AbstractScrap {
    _name = 'AhorroScrap';
    _docClass = AhorroDoc;

    _collectionWriteObj(price) {
        return { "$set": { "prices.ahorro": price } };
    }
};