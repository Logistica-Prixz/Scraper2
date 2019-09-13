//Importing mongodb client to read from the database
const MongoClient = require('mongodb').MongoClient;

class SanPabloScrap extends EventEmitter {

    constructor(settings = {}) {
        if (settings != null) {
            this._settings = settings;
        }
    }

    /**
     * @description getPrices get the prices from the proper server and return them
     *
     * @param {*} [settings={}] the full settings object
     * @returns prices list in form of [{EAN,Price},..]
     */
    async getPrices(settings = {}) {
        const mongo = await MongoClient.connect(settings.mongo.url, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = await mongo.db('prixz');
        var producto_prixz = db.collection('producto-prixz');
        var cursor = await producto_prixz.find({}, { projection: { _id: 0, codigoEAN1: true } });

        var doc = new SanPabloDoc(cursor.next());
        const ready = async() => {
            console.log(await doc.ean, await doc.price);
            if (cursor.hasNext) {
                let next = await cursor.next();
                if (next.codigoEAN1) {
                    doc.removeAllListeners('ready');
                    doc = new SanPabloDoc(next.codigoEAN1.toString());
                    doc.on('ready', ready);
                } else {
                    console.log("ERROR", next.codigoEAN1);
                }
            }
        }
        doc.on('ready', ready);

    }
};

module.exports = SanPabloScrap;