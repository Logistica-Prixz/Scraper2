const Doc = require('../docs/AbstractDoc');
const { MongoClient } = require('mongodb');
const { EventEmitter } = require('events');

module.exports = class AbstractScrap extends EventEmitter {
    _settings = {};
    _name = 'AbstractScrap';
    _docClass = Doc;

    /** 
     *Creates an instance of AbstractScrap.
     * @param {*} [settings={}] the full settings object
     */
    constructor(settings = {}) {
        super();
        if (settings != null) {
            this._settings = settings;
        } else {
            throw new Error("(" + this._name + "::constructor) Setting object null or empty");
        }
    }

    _collectionWriteObj(price) {
        throw new Error("Abstract Method AbstractScrap._collectionWriteObj , implement a child class to use it");
        return null
    }

    /**
     * @description getPrices get the prices from the proper server and return them
     *
     * @param {*} [settings={}] the full settings object
     * @returns prices list in form of [{EAN,Price},..]
     */
    async getPrices() {
        const mongo = await MongoClient.connect(this._settings.mongo.url, { useNewUrlParser: true, useUnifiedTopology: true, retryWrites: false });
        const db = await mongo.db('prixz');
        var product = db.collection('producto-prixz');
        var scraper = db.collection('scraper');
        var cursor = await product.find({}, { projection: { _id: 0, codigoEAN1: true } });
        const that = this;

        var child = await cursor.next();
        var doc = new this._docClass(cursor.codigoEAN1);
        const ready = async() => {
            if (await doc.price < 999999) {
                scraper.updateOne({ ean: await doc.ean }, { "$set": { prices: this._collectionWriteObj(await doc.price) } }, { upsert: true },
                    async function(err, data) {
                        if (err) {
                            console.log(err);
                            process.exit(1);
                            return;
                        }
                        console.log("Saved", doc.ean, doc.price);
                        if (cursor.hasNext) {
                            let next = await cursor.next();
                            if (next.codigoEAN1) {
                                doc.removeAllListeners('ready');
                                doc = new that._docClass(next.codigoEAN1.toString());
                                doc.on('ready', ready);
                            } else {
                                console.log("ERROR", next.codigoEAN1);
                            }
                        }
                    }
                );

            } else {
                console.log("No price. No saved", doc.ean, doc.price);
                //Hate to do this, repeating code I mean, but it's temporary
                if (cursor.hasNext) {
                    let next = await cursor.next();
                    if (next.codigoEAN1) {
                        doc.removeAllListeners('ready');
                        doc = new this._docClass(next.codigoEAN1.toString());
                        doc.on('ready', ready);
                    } else {
                        console.log("ERROR", next.codigoEAN1);
                    }
                }
            }
        };
        doc.on('ready', ready);

    }
};