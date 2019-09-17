const SanPabloDoc = require('./src/docs/SanPabloDoc');
const settings = require('./settings.js')();
const MongoClient = require('mongodb').MongoClient;

(async() => {
    const mongo = await MongoClient.connect(settings.mongo.url, { useNewUrlParser: true, useUnifiedTopology: true, retryWrites: false });
    const db = await mongo.db('prixz');
    var product = db.collection('producto-prixz');
    var scraper = db.collection('scraper');
    var cursor = await product.find({}, { projection: { _id: 0, codigoEAN1: true } });

    var coso = await cursor.next();
    console.log("coso", coso.codigoEAN1);
    var doc = new SanPabloDoc(coso.codigoEAN1);
    const ready = async html => {
        console.log("---->", typeof await doc.price, await doc.price);
        if (await doc.price < 999999) {
            try {
                scraper.updateOne({ ean: await doc.ean }, { "$set": { prices: { sanpablo: await doc.price } } }, { upsert: true },
                    async function(err, data) {
                        if (err) {
                            console.log(err);
                            process.exit(1);
                            return;
                        }
                        console.log("saved", doc.ean, doc.price);

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
                );
            } catch (e) {
                console.log(e);
                process.exit(1);
                return;
            }

        }
    };
    doc.on('ready', ready);
})();