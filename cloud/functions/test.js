/* global Parse */
// these functions accept req, res as params.
const path = require('path');
const xlsx = require('xlsx');


const INPUT_FILES_LOCATION = '../input';
Parse.Cloud.define('upload', (req, res) => {
  const BSE = Parse.Object.extend("BSEDATA");
  const filePath = path.join(__dirname, INPUT_FILES_LOCATION, 'file1.csv');
  const workBook = xlsx.readFile(filePath);
  const fileData = xlsx.utils.sheet_to_json(workBook.Sheets[workBook.SheetNames[0]], {
    raw: false,
  });
  const savedData = [];
  const unsavedData = [];
  fileData.forEach(item => {
    const BSEObject = new BSE();
    const TradingDate = item['Trading Date']
    const ScripCode = item['Scrip Code']
    const ScripName = item['Scrip Name']
    const ISIN = item['ISIN']
    const Open = item['Open']
    const Low = item['Low']
    const High = item['High']
    const Close = item['Close']
    const Volume = item['Volume']

    if (TradingDate && ScripCode && ScripName && ISIN && Open != undefined && Low != undefined && Close != undefined && High != undefined && Volume != undefined) {
      BSEObject.set("TradingDate", new Date(TradingDate));
      BSEObject.set("ScripCode", Number(ScripCode));
      BSEObject.set("ScripName", ScripName);
      BSEObject.set("ISIN", ISIN);
      BSEObject.set("Open", Number(Open));
      BSEObject.set("Low", Number(Low));
      BSEObject.set("High", Number(High));
      BSEObject.set("Close", Number(Close));
      BSEObject.set("Volume", Number(Volume));
      savedData.push(BSEObject)
    } else {
      unsavedData.push({TradingDate, ScripCode, ScripName, ISIN, Open, Low, Close, High, Volume})
    }
  });
  const start = 0;
  const end = 10000;
  const chunk = savedData.slice(start, end);
  Parse.Object.saveAll(chunk)
  .then((list) => {
    console.log(`Data Saved----From = ${start}---Till = ${end}`);
    return {error: false, start, end}
  }, (error) => {
    console.log(`Errrr  From-${start}...Till-${end}`);
    console.log(`Errrr  is-${error}`);
  });
});
