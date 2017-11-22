const readline = require('readline-sync');
const fs = require('fs');
const readline1 = require('readline');
const Table = require('cli-table2');


let hits = [];
let companies = [];
let max_length=0;
let article ='';
let words_to_ignore = ['a','an','the','and','or','but'];

class trie_node{
	constructor(str){
		this.data = str;
		this.children = [];
		this.end = false;
		this.parent = '';
	}
}

class trie{
	constructor(){
		this.head = null;
	}
	print(){
		for(let i of this.head.children){
			console.log(i.data,'1st node',i.parent);
			if(i.children.length){
				for(let j of i.children){
					let c = j;
					while(c.parent==''){
						console.log(c.data,c.parent);
						c = c.children.shift();
					}
					console.log(c.data,c.parent,"last node");
				}		
			}
		}
	}

	searchArticle(str){
		let work = str.split(' ');
		let node = this.head;
		let search_length = 2;
		for(let c=0;c<work.length;c++){
			let w = work[c];
			let current = node.children[node.children.findIndex((elem)=>elem.data ==w)];
			if(current && current.parent!=''){
					let idx = companies.indexOf(current.parent);
					hits[idx]++;
			}
			else if(current && current.parent==''){
					let t = work[++c];
					if(current.children.findIndex((elem)=>elem.data==t)==-1){
						hits[companies.indexOf(w)]++;
						continue;
					}
					while(current.children.findIndex((elem)=>elem.data==t)>=0 && current.parent==''){
						current = current.children[current.children.findIndex((elem)=>elem.data==t)];						
						t = work[++c];
					}
					hits[companies.indexOf(current.parent)]++;
					c--;
			}
			else{
				continue;
			}
		}
		node = this.head;
		while(search_length<=max_length){
			for(let i=0;i<work.length-search_length+1;i++){
				let s1='';
				let k=0;
				for(k=0;k<search_length;k++){
					s1 = s1.concat(work[i+k],' ');
				}
				let c = i+k-1;
				let w = s1.slice(0,-1);
				let current = node.children[node.children.findIndex((elem)=>elem.data ==w)];
				if(current && current.parent!=''){
						let idx = companies.indexOf(current.parent);
						hits[idx]++;
				}
				else if(current && current.parent==''){
						let t = work[++c];
						if(current.children.findIndex((elem)=>elem.data==t)==-1){
							hits[companies.indexOf(w)]++;
							continue;
						}
						while(current.children.findIndex((elem)=>elem.data==t)>=0 && current.parent==''){
							current = current.children[current.children.findIndex((elem)=>elem.data==t)];						
							t = work[++c];
						}
						hits[companies.indexOf(current.parent)]++;
						c--;
				}
				else{
					continue;
				}
			}
			search_length++;
		}
	}
	
}

function readArticle(trie){
	let rl = readline1.createInterface({
  		input: process.stdin,
  		output: process.stdout,
  		terminal: false
		});
	rl.on('line',(line)=>{
	if(line==='.'/*|| line.match(/\s[.]+\s/)*/){
			rl.close();
	}
	else{
		article+=line;
		if(line!=undefined){
			trie.searchArticle(line);
		}
	}
	});

	rl.on('close',() =>{
		calculateWordCount();
	});
}

function calculateWordCount(){
	if(article){
		article = article.replace(/(and|the|but|an|or|a)/g,'');
		article = article.replace(/(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g,'');
		article = article.split(' ');
		article = article.filter((word)=> word != '');
		displayRelevance(article.length);
	}
}

function displayRelevance(wordcount){
	percentages = [];
	for(let i of hits){
		let temp = (i / wordcount * 100).toPrecision(4);
		percentages.push(temp);
	}
	
	//To print output
	
var table = new Table({
    head: ['Company', 'Hit Count','Relevance'],
    colWidths: [30,30,30]
});

for(var i=0;i<companies.length;i++){
    table.push(
    [companies[i],hits[i],percentages[i]+'%'])
	;}

//To calculate Total Hits, Relevance
	var sum = 0;
	var sum1 = 0;
	for( var i = 0; i < companies.length; i++ ){
		sum += parseInt( hits[i], 10 );
		sum1 += parseInt( percentages[i], 10 );
	}
	
table.push(    
    ['Total',sum,sum1+'%']);

var table1 = new Table({
    colWidths: [46,45]
    });
table1.push(
    ['Total Words',wordcount]);

    console.log(table.toString());
    console.log(table1.toString());
}

function readCompanies(){
	let str = 'companies.dat';
	let company = fs.readFileSync(str,'UTF-8');
	let str1 = company.split("\r\n");
	let comp_data = [];
	for(i of str1){
		str2 = i.split('\t');
		comp_data.push(str2);
	}
	let count = 0;
	let trie1 = new trie;
	trie1.head = new trie_node('');
	for(i of comp_data){
		let newNode = new trie_node(i[0]);
		hits.push(0);
		companies.push(i[0].toString());
		max_length = Math.max(max_length, i[0].split(' ').length);
		for(let j=1;j<i.length;j++){
			let temp = i[j],temp1= '';
			temp1 = temp.replace(i[0].toString()+' ','');
			if(temp1==temp){
				let newSyn = new trie_node(temp);
				newSyn.parent = i[0].toString();
				trie1.head.children.push(newSyn);	
			}
			else{
				let current = newNode;
				let arr = temp1.split(' ');
				while(arr.length && current.parent==''){
					let s = arr.shift();
					let n = new trie_node(s);
					if(arr.length==0)
						n.parent = i[0].toString();
					current.children.push(n);
					current = n;
				}
			}
		}
		trie1.head.children.push(newNode);
	}
	return trie1;
}

function main(){
	let trie1 = readCompanies();
	let article = '';
	readArticle(trie1);
	let words = article;
	if(words)
		console.log(words);
}
main();

