const fs = require('fs');
const readline = require('readline-sync');


let infile = fs.readFileSync('infile.dat', 'UTF-8');

//string of length = 250
let record = new Map();
for(let c of infile){
	c = c.toLowerCase();
	if(c.match(/[a-z]/)){
		if(!record.get(c))
			record.set(c,1);
		else
			record.set(c,record.get(c)+1);
	}
}
console.log(record);
