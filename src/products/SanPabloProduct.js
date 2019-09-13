const cheerio = require('cheerio');

module.exports = class SanPabloProduct {
    constructor(raw) {
        this.$ = cheerio.load(raw);
    }
    get html() {
        return this.$.html();
    }
    get price() {
        var el = this.$('.item-prize').text();
        var match = el.match(/[-+]?[0-9]*\.?[0-9]+/g);
        if (match) {
            return match[0];
        }
        return 999999;

    }
}