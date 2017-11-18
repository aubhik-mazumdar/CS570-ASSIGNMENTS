var fs = require('fs');
var Table = require('cli-table');

//Took input file as article.dat to calculate total words
var text = fs.readFileSync("./article.dat").toString('utf-8');

let company=['Microsoft','Apple','Verizon'];
let Hits=[4,2,3];
let Relevance=[];

//To calculate total words
var textByWord = text.split(/\s+/);
let total=textByWord.length;

//To print output
var table = new Table({
    head: ['Company', 'Hit Count','Relevance'],
    colWidths: [30,30,30]
});

for(var i=0;i<company.length;i++){
    Relevance1=(Hits[i]/total)*100;
    table.push(
    [company[i],Hits[i],Relevance1+'%'])
    Relevance.push(Relevance1);}


let Relevance2=Relevance.reduce(add,0);
let Hits1=Hits.reduce(add,0);
    
table.push(    
    ['Total',Hits1,Relevance2],['Total Words',total,''])

    console.log(table.toString());

//Add function
function add(a,b){
    return a+b;
}
