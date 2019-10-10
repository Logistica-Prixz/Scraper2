const AbstractScrap = require('./AbstractScrap');
const FarmalistoDoc = require('../docs/FarmalistoDoc');

module.exports = class FarmalistoScrap extends AbstractScrap {
    _name = 'FarmalistoScrap';
    _docClass = FarmalistoDoc;

    _collectionWriteObj(price) {
        return { "$set": { "prices.farmalisto": price } };
    }
};