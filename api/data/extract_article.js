var fs      = require("fs");
var path    = require("path");

var inputFileName = process.argv[2];
console.log(process.argv);

var inputString = fs.readFileSync(path.join(__dirname, inputFileName));
var inputObj = JSON.parse(inputString);

var outputFileName;
var itemIndex;
var articleIds = [];
for (itemIndex = 0; itemIndex < 10; itemIndex += 1) {
    var item = inputObj.assets[itemIndex];
    var outputString = JSON.stringify(item);
    outputFileName = "article" + item.id + ".json";

    fs.writeFileSync(path.join(__dirname, outputFileName), outputString);

    articleIds.push(item.id);
}

var sectionObj = {};
sectionObj.articleIds = articleIds;
outputString = JSON.stringify(sectionObj);

outputFileName = "section.json";
fs.writeFileSync(path.join(__dirname, outputFileName), outputString);
