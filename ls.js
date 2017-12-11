const Table = require('cli-table2');

let network=['A','B','C'];                                            //Array of strings
let outgoing_link=[155.23,155.29,155.24];                             //Array of integers

var table = new Table({
    head: ['Network', 'Outgoing Link'],
    colWidths: [30,30]
});

for(var i=0;i<network.length;i++){
    table.push(
    [network[i],outgoing_link[i]])
};

console.log(table.toString());