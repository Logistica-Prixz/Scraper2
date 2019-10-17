const Doc = require('../docs/AbstractDoc');
const { MongoClient } = require('mongodb');
const { EventEmitter } = require('events');
const NAME_LENGTH = 20;

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
        this.getPrices();
    }

    _collectionWriteObj(price) {
        throw new Error("Abstract Method AbstractScrap._collectionWriteObj , implement a child class to use it");
        return null
    }

    /**
     * @description getPrices get the prices from the proper server and return them
     *
     * @returns prices list in form of [{EAN,Price},..]
     */
    async getPrices() {
        const mongo = await MongoClient.connect(this._settings.mongo.url, { useNewUrlParser: true, useUnifiedTopology: true, retryWrites: false });
        const db = await mongo.db('prixz');
        var product = db.collection(this._settings.mongo.productCollection);
        var scraper = db.collection(this._settings.mongo.scraperCollection);
        var cursor = await product.find({}, { projection: { _id: 0, codigoEAN1: true } });
        const that = this;

        var child = await cursor.next();
        var doc = await new this._docClass(child.codigoEAN1);
        const ready = async() => {
            if (await doc.price < 999999) {
                scraper.updateOne({ ean: await doc.ean }, this._collectionWriteObj(await doc.price), { upsert: true },
                    async function(err, data) {
                        if (err) {
                            console.log(err);
                            process.exit(1);
                            return;
                        }
                        console.log(that._normalizeName(that._name, NAME_LENGTH), ":: Saved", doc.ean, doc.price);
                        if (cursor.hasNext) {
                            let next = await cursor.next();
                            if (next && next.codigoEAN1) {
                                doc.removeAllListeners('ready');
                                doc = new that._docClass(next.codigoEAN1.toString());
                                doc.on('ready', ready);
                            } else {
                                console.log("ERROR", next.codigoEAN1);
                                console.log(err);
                                process.exit(1);
                                return;
                            }
                        }
                    }
                );

            } else {
                console.log(that._normalizeName(that._name, NAME_LENGTH), ":: No price. No saved", doc.ean, doc.price);
                //Hate to do this, repeating code I mean, but it's temporary
                if (cursor.hasNext) {
                    let next = await cursor.next();
                    if (next.codigoEAN1) {
                        doc.removeAllListeners('ready');
                        doc = new this._docClass(next.codigoEAN1.toString());
                        doc.on('ready', ready);
                    } else {
                        console.log(that._normalizeName(that._name, NAME_LENGTH), "End of collection");
                        this.emit("end");
                    }
                }
            }
        };
        doc.on('ready', ready);


    }

    _normalizeName(name, spaces) {
        while (name.length < spaces) {
            name += " ";
        }
        return name;

    }
};