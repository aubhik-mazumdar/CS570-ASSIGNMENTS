/***************************************
*	CS-570(A)
*	HUFFMAN CODING ASSIGNMENT
*	Group Members (GROUP 16)
*	'''''''''''''
*	Aubhik Mazumdar
*	Mrunmayee Salunke
*	Siddhesh Prabhu
***************************************/
const fs = require('fs');
const readline = require('readline-sync');

//Define node for tree data structure(Array)
class tree_node{
	constructor(lchild,rchild,par){
		this.leftchild = lchild;
		this.rightchild = rchild;
		this.parent = par;
	}
}

//Define node for alphabet data structure(Array)
class symbol_info{
	constructor(letter, value, le){
		this.symbol = letter;
		this.frequency = value;
		this.leaf = le;
	}
}

//Define node for forest data structure(Priority Queue(Min Heap))
class forest_roots{
	constructor(w,r){
		this.weight = w;
		this.root = r;
	}
}

main();

//Function to add a node to the Priority Queue/minheap(Forest)
function addto(heap,value)
{
	heap.push(value);
	bubbleUp(heap,heap.length-1);
}

//Function to assign the correct position to the recenty added node
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

//Function to remove the minimum element from the min heap(Forest)
function remove(heap){
	
	//find first node with children
	let temp = heap[0];
	heap[0]=heap[heap.length-1];
	heap[heap.length-1]=temp;
	heap.pop();
	heapify(heap,0);
	return temp;
}

//Function to  rearrange the min heap after removing an element
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

//Critical function performing the actions needed to create the Forest and Tree DS and forming the Huffman Tree
function build_huffman_tree(frequencies){
	forest = [];
	alphabet = new Array(symbol_info);
	tree = new Array(tree_node);
	//Create alphabet structure and Forest structure
	for(let i in frequencies){
		let newSymbol = new symbol_info(frequencies[i][0],frequencies[i][1],Number(i)+1);
		let newFor = new forest_roots(frequencies[i][1],Number(i)+1);
		alphabet.push(newSymbol);
		addto(forest,newFor);
	}
	//remove extra element due to 'in' loop
	alphabet.shift();
	compress(forest,alphabet,tree);
	let codes = new Array(Number(forest[0].root)).fill('');
	codes = build_codes(tree,codes);
	let huffman_codes = [];
	for(let i=0;i<frequencies.length;i++){
		huffman_codes.push([frequencies[i][0],codes[i]]);
	}
	return huffman_codes;
}

//Updating the Data Structures and creating the Final Huffman Tree
function compress(forest,alphabet,tree){
	let newParent = alphabet.length + 1;
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
//Once the tree is created this function builds the codes by traversing from the root to the leaves(alphabets)
function build_codes(tree,codes){
	for(let i=tree.length-1;i>=0;i--){
		let c = tree[i];
		codes[c.leftchild-1]=codes[c.parent-1]+'0';
		codes[c.rightchild-1]=codes[c.parent-1]+'1';
	}
	return codes;
}

//MAIN function handling the flow of the program
function main(){
	//Take in path and filename from user
	let input = '';
	let infile='';
	let flag = 0;
	//If no input, default path= cwd and file = infile.dat
	do{
	let input = readline.question("Enter the input file path+filename: ");
	if(!input){
		infile = fs.readFileSync('infile.dat', 'UTF-8');
		flag = 0;
	}
	else{
		//Check if file is a .dat or .txt
		if(!input.match(/(.dat|.txt)/)){
				console.log('Please use a .dat or .txt file');
				flag = 1;
				continue;
			}
		try{
			//Check if file exists
			infile = fs.readFileSync(input, 'UTF-8');
			flag = 0;
		}
		catch(err){
			//If file doesnt exist, return and quit
			flag = 1;
			console.log("Sorry, the file doesnt exist.");
			}
		}
	}while(flag == 1)
	let count = 0;
	let freq = {};
	for (let i=0; i<infile.length;i++) {
	    c = infile[i];
	    //Consider only letters and digits
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
	console.log("[*]Frequencies for characters calculated");
	let sortable = sorter(freq);
	let percentages = calculate_percentage(sortable,count);
	let huffman = build_huffman_tree(sortable);
	console.log("[*]Huffman Codes Built");
	let datfile = '';
	//checks for output file
	do{
	input = '';
	input = readline.question("Enter the output file path+filename: ");
	datfile = input;
	flag = 0;
	if(!input){
		datfile = 'outfile.dat';
		flag = 0;
	}
	if(!datfile.match(/(.dat|.txt)/)){
				console.log('Please use a .dat or .txt file');
				flag = 1;
			}
	}while(flag==1)
	//Create a write stream to create a buffer for entering the strings we wish to write finally in outfile.dat
	let writeStream = fs.createWriteStream(datfile);
	writeStream.write('SYMBOL         FREQUENCY\n');
	while(percentages.length){
		c = percentages.shift();
		writeStream.write(c[0]+"               "+c[1]+"\n");
	}
	writeStream.write('\nSYMBOL         HUFFMAN CODE\n');
	for(i=0;i<huffman.length;i++){
		c = huffman[i];
		writeStream.write(c[0]+" ------------> "+c[1]+"\n");
	}
	let record = mapify(huffman);
	writeStream.write("\nThe length of the coded message(in bits):"+calculate_bits(infile,record));
	writeStream.end();
	console.log("[*]Output file written at",datfile);
}

//Helper functions for Main
//Convert 2D array to Map
function mapify(huffman){
	let record = new Map();
	for(let c of huffman){
				record.set(c[0],c[1]);
		}
	return record;
}
//Calculate the total bits used
function calculate_bits(infile,record){
	let str ='';
	for (let i=0; i<infile.length;i++) {
	    c = infile[i];
	    if(c.match(/[a-zA-Z0-9]/)){
	    	str += record.get(c);
		}
	}
	return str.length
}

//Sort an array of objects
function sorter(freq){
	let sortable = [];
	//Sort the frequencies in descending order
	for (let e in freq) {
	    sortable.push([e, freq[e]]);
	}

	sortable.sort(function(a, b) {
	    return b[1] - a[1];
	});
	return sortable;
}
//Calculate percentage
function calculate_percentage(sortable,count){
	//Store the percentage of occurence for each character
	let percentages = [];
	for(let i in sortable){
		percentages.push([sortable[i][0],((sortable[i][1] / count)*100).toFixed(4)])
	}
	return percentages;
}
