# Scraper2

## How it works

The scraping functionality has a simple structure based on 3 absctract clases:

- A Scraping class extended from [src/scrapers/AbstractScrap.js]
- A Doc class extended from [src/docs/AbstractDoc.js]
- A Product class extended from [src/products/AbstractProduct.js]

### Scraping class

A scraping class opens a set of urls related with the EANs of the products. For now it's no necesary to implement this functionality using the name or the salt of the product (In case it's a medicine). All the EANS come from the **producto-prixz** collection in the *prixz* Mongo database.

To create a new Scrap class it's only needed to implement the [AbstractScrap](src/scrapers/AbstractScrap.js) one and set the following protected variables:

- **_docClass**: The class of the imported class that implements AbstractDoc
- **_name__**: The name that will identified the calls of that specific scraper
- **__collectionWriteObj_(price)**: Function that creates the object provided for MongoDB to upsert the price in the realted ean

A scraping class emits an **end** event when all the EANS in the collection were passed.

The Scraper uses a Document class to know how to manage that url, go for the price and get it


### Document class

A Document class emits a **ready** event when the content is ready

To create a Document class only implement the [AbstractDoc](src/docs/AbstractDoc.js) one and implement any way to get the price of that ean. Right now, all the Docs classes set the file constant __searchURL__  to an static one and concatenate it with the ean. That's because all the site scraped respond to EAN search directly and uses GET variables to do it, generating a url with the form **http(s)//(Website)(some query variable)(the ean number of the product), this are some examples:

- https://www.farmalisto.com.mx/resultados?s=7501008491966
- https://www.farmaciasanpablo.com.mx/search/?text=7501008491966
- https://www.farmalisto.com.mx/resultados?s=7501008491966

Notice the pattern here. All the searches gets Aspirina as product and gets in the same page the price, so the scraping is easy in this examples.

You should implement a different Doc class if you want to scrap from a more complex website or if you want to use an api, webservice, databse or any other method to obtain the prices

### Product class

A product class is optional for scraping, but it is the core of the actual scraping functionality. It's used only to get the price from the given html content. Usually, a Document class pass the raw html getted from the resulting website to the Product class and this one gets the price. Usually this kind of class uses cheerio or other jquery-like queries engine and/or regular expressions to get the right price.block

The prices must be returned in float format.block

To create a Product class you should override the **price** getter to analize the content an return the price

# Setup

The setup of this project should be very easy. Just install Node JS (you should know how to program with it of course) and follow the instructions below

## Installation

Just run
```bash
npm install
```

## Running

The best way to run this project is using [pm2](https://pm2.io/) with the following command:

```bash
pm2 start index.js --name Scraper2 --time --watch
```

The project if full of process.exit(1) everywhere in order to end the process hoping that pm2 restart it again


