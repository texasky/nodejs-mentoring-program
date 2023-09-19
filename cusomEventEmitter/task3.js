const fs = require('fs');
const csv = require("csvtojson");

const csvFilePath = "csvdirectory/nodejs-hw1-ex1.csv";

const fileReadStream = fs.createReadStream(csvFilePath);

let headerTitles;

csv()
    .preFileLine((fileLineString, lineIdx)=> {
        if(lineIdx === 0) {
            headerTitles = fileLineString.split(",");
            return
        }

        const lineArray = fileLineString.split(",");
        let lineObj = {};

        lineArray.forEach((lineText,index) => {
            lineObj[headerTitles[index]] = lineText;
        })

        const jsonFormattedLine = JSON.stringify(lineObj) + "\n";

        fs.appendFile('exelData.txt', jsonFormattedLine, (err) => {
            if (err) console.log(err);
        });
    })
    .fromStream(fileReadStream)
    .on('error', (error) => {
        console.log(error)
    })
