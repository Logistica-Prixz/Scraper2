const settings = require('./settings.js')();
const SanPabloScrap = require('./src/scrapers/SanPabloScrap');
try {
    (async() => {
        var scrap = await new SanPabloScrap(settings);
        await scrap.getPrices(settings);
    })();
} catch (error) {
    process.exit(1);
    return;
}