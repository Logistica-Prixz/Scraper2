const SanPabloDoc = require('./src/docs/SanPabloDoc');
const settings = require('./settings.js')();
const MongoClient = require('mongodb').MongoClient;
try {
    (async() => {
        const mongo = await MongoClient.connect(settings.mongo.url, { useNewUrlParser: true, useUnifiedTopology: true, retryWrites: false });
        const db = await mongo.db('prixz');
        var product = db.collection('producto-prixz');
        var scraper = db.collection('scraper');
        var cursor = await product.find({}, { projection: { _id: 0, codigoEAN1: true } });

        var child = await cursor.next();
        console.log("first child", child.codigoEAN1);
        var doc = new SanPabloDoc(cursor.codigoEAN1);

        const ready = async html => {
            if (await doc.price < 999999) {
                scraper.updateOne({ ean: await doc.ean }, { "$set": { prices: { sanpablo: await doc.price } } }, { upsert: true },
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
                                doc = new SanPabloDoc(next.codigoEAN1.toString());
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
                        doc = new SanPabloDoc(next.codigoEAN1.toString());
                        doc.on('ready', ready);
                    } else {
                        console.log("ERROR", next.codigoEAN1);
                    }
                }
            }
        };
        doc.on('ready', ready);

    })();
} catch (error) {
    process.exit(1);
    return;
}