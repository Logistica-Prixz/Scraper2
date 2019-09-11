const puppeteer = require('puppeteer');
const EventEmitter = require('events');
const searchURL = 'https://www.farmaciasanpablo.com.mx/search/?text=';

const SanPabloProduct = require('../products/SanPabloProduct');

module.exports = class SanPabloDoc extends EventEmitter {
    constructor(ean) {
        super();
        this.setMaxListeners(1000);
        this._ean = ean;
        (async() => {
            await this.init();
            this.emit('ready', this._content);
        })();

    }
    async init() {
        var browser = await puppeteer.launch();
        this.page = await browser.newPage();
        var time1 = (new Date()).getTime();
        await this.page.goto(searchURL + this._ean, { waitUntil: 'networkidle2' }).catch(err => {
            console.log(err);
        })
        var time2 = (new Date()).getTime();
        this._content = await this.page.content();
        this._loadtime = (time2 - time1) / 1000;
        console.log("-[", this._loadtime, "]-");
    }
    get content() {
        return this._content;
    }
    get price() {
        var p = new SanPabloProduct(this._content);
        return p.price

    }
    get loadtime() {
        return this._loadtime;
    }
    get ean() {
        return this._ean;
    }
}