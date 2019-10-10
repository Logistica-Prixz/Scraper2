const AbstractScrap = require('./AbstractScrap');
const AhorroDoc = require('../docs/AhorroDoc');
const { MongoClient } = require('mongodb');


module.exports = class AhorroScrap extends AbstractScrap {
    _name = 'AhorroScrap';
    _docClass = AhorroDoc;

    _collectionWriteObj(price) {
        return { "$set": { "prices.ahorro": price } };
    }
};