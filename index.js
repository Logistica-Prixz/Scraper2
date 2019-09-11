const SanPabloDoc = require('./src/docs/SanPabloDoc');
const settings = require('./settings.js')();
const MongoClient = require('mongodb').MongoClient;

(async() => {
    const mongo = await MongoClient.connect(settings.mongo.url, { useNewUrlParser: true, useUnifiedTopology: true, retryWrites: false });
    const db = await mongo.db('prixz');
    var product = db.collection('producto-prixz');
    var scraper = db.collection('scraper');
    var cursor = await product.find({}, { projection: { _id: 0, codigoEAN1: true } });

    var doc = new SanPabloDoc(cursor.next());
    const ready = async html => {
        if (await doc.price < 99999) {
            scraper.updateOne({ ean: await doc.ean }, { "$set": { prices: { sanpablo: await doc.price } } }, { upsert: true },
                async function(err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("score succeded", await doc.ean);
                    }
                }
            );
        }
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
    };
    doc.on('ready', ready);
})();