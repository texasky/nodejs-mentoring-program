const fs= require("fs");
const csv = require("csvtojson");

const csvFilePath = "csvdirectory/nodejs-hw1-ex1.csv";
const fileReadStream = fs.createReadStream(csvFilePath);

csv()
    .preFileLine((fileLineString)=> fileLineString)
    .fromStream(fileReadStream)
    .subscribe((jsonObj) => {
        const { Amount, ...filteredObj } = jsonObj;
        const jsonFormattedObj = JSON.stringify(filteredObj)  + "\n";

        fs.appendFile('exelData.txt', jsonFormattedObj, (err) => {
            if (err) console.log(err);
        });
    })
    .on('error', (error) => {
        console.log(error)
    })
