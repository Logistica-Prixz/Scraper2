const settings = require('./settings.js')();
const SanPabloScrap = require('./src/scrapers/SanPabloScrap');
const AhorroScrap = require('./src/scrapers/AhorroScrap');
const FarmalistoScrap = require('./src/scrapers/FarmalistoScrap');
try {
    (async() => {
        var sanPablo = await new SanPabloScrap(settings);
        var ahorro = await new AhorroScrap(settings);
        var flisto = await new FarmalistoScrap(settings);
    })();
} catch (error) {
    console.error(error);
    process.exit(1);
    return;
}