const fs = require('fs');
const readline = require('readline-sync');


class tree_node{
	constructor(lchild,rchild,par){
		this.leftchild = lchild;
		this.rightchild = rchild;
		this.parent = par;
	}
}

class symbol_info{
	constructor(letter, value, le){
		this.symbol = letter;
		this.frequency = value;
		this.leaf = le;
	}
}

class forest_roots{
	constructor(w,r){
		this.weight = w;
		this.root = r;
	}
}

function addto(heap,value)
{
	heap.push(value);
	bubbleUp(heap,heap.length-1);
}


function bubbleUp(heap,idx){
	let parent = parseInt(((idx-1) / 2),10);
	if(idx && heap[idx].weight<heap[parent].weight){
		//SWAP
		let temp = heap[parent];
		heap[parent]=heap[idx];
		heap[idx]=temp;
		bubbleUp(heap,parent);
	}
}

function remove(heap){
	
	//find first node with children
	//heapify(heap,0);
	let temp = heap[0];
	heap[0]=heap[heap.length-1];
	heap[heap.length-1]=temp;
	heap.pop();
	heapify(heap,0);
	return temp;
}

function heapify(heap,idx){
	let left = idx*2+1;
	let right = idx*2+2;
	let maximumIdx = idx;
	if(heap[left] && heap[maximumIdx].weight>=heap[left].weight){
		maximumIdx = left;
	}
	if(heap[right] && heap[maximumIdx].weight>=heap[right].weight){
		maximumIdx = right;
	}
	if(maximumIdx != idx){
		let temp = heap[maximumIdx];
		heap[maximumIdx]=heap[idx];
		heap[idx]=temp;
		heapify(heap,maximumIdx);
	}
}


function build_huffman_tree(frequencies){
	forest = [];
	alphabet = new Array(symbol_info);
	tree = new Array(tree_node);
	for(let i in frequencies){
		let newSymbol = new symbol_info(frequencies[i][0],frequencies[i][1],Number(i)+1);
		let newFor = new forest_roots(frequencies[i][1],Number(i)+1);
		let newTree = new tree_node(0,0,0);
		alphabet.push(newSymbol);
		tree.push(newTree);
		addto(forest,newFor);
	}
	tree.shift();
	alphabet.shift();
	
	compress(forest,alphabet,tree);
	console.log(forest);
	console.log(tree);
}

function compress(forest,alphabet,tree){
	let newParent = tree.length + 1;
	while(forest.length>1){
		let least = remove(forest);
		let second = remove(forest);
		let newNode = new tree_node(least.root,second.root,newParent);
		let newFor = new forest_roots((least.weight+second.weight),newParent);
		addto(forest,newFor);
		tree.push(newNode);
		newParent++;
	}
}

let infile = fs.readFileSync('infile.dat', 'UTF-8');
let count = 0;
//string of length = 250
let freq = {};
for (let i=0; i<infile.length;i++) {
    c = infile[i];
    if(c.match(/[a-zA-Z0-9]/)){
    	count++;
	    if (freq[c]) {
	       freq[c]++;
	    } 
	    else {
	       freq[c] = 1;
	    }
	}
}
var sortable = [];
for (var e in freq) {
    sortable.push([e, freq[e]]);
}

sortable.sort(function(a, b) {
    return b[1] - a[1];
});
console.log(sortable);
let percentages = [];
for(let i in sortable){
	percentages.push([sortable[i][0],((sortable[i][1] / count)*100).toFixed(4)])
}
console.log(percentages);
build_huffman_tree(sortable);
