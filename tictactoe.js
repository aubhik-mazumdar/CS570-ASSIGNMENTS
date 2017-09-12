const stream = require('stream');
const fs = require('fs');
const readline = require('readline-sync');

function game(p,bs,w,arr){
	this.players = p;
	this.board_size = bs;
	this.win_sequence = w;
	this.array = arr;
}

function saveGame(game){

}

function printboard(board_size){
	let i=1,j=1;
	process.stdout.write(" ");
	for(i=1;i<=board_size;i++){
		process.stdout.write(" ");
		process.stdout.write(i.toString())
		process.stdout.write("  ");
	}
	process.stdout.write("\n");
	for(i=1;i<board_size;i++)
	{
		process.stdout.write(i.toString());
		for(j=1;j<board_size;j++)
		{
			process.stdout.write("   |");		
		}
		
		process.stdout.write("\n")
		process.stdout.write(" ");
		for(j=1;j<board_size;j++)
		{
			process.stdout.write("---+");	
		}
		process.stdout.write("---\n");
	}
	process.stdout.write(i.toString());
	for(j=1;j<board_size;j++){	
			process.stdout.write("   |");		
		}
	console.log();
}

function loadGame(fileName){
	let data= fs.readFileSync(fileName);
	data = data.toString();
	data=data.trim();
	//console.log(data);
	// = data.split(',',3);
	let array = [];
	let gamedata=data.split("\r\n");
	for(i=0;i<gamedata.length;i++)
	{
			array[i]=gamedata[i].split(",");
	}
	for(i in array)
		array[i].pop();
	let temp= array.splice(0,1);
	[players,board_size,win_sequence]=temp[0];
	console.log(temp);
	console.log(array);
	console.log(players, board_size, win_sequence);
}



function newGame(){
	let players=0;
	let board_size=0;
	let win_sequence=0;
	console.log("Welcome to a New Game");
	players = readline.question("Enter the number of players(minimum 2, maximum 26):");
	board_size= readline.question("Enter the size of the board(minimum 3, maximum 999:");
	win_sequence= readline.question("Enter the winning sequence count:");
	console.log(players,board_size,win_sequence);
	if(win_sequence<3){
		console.error("ERROR- Please enter a winning sequence count > 2");
		Error;
	}
	if(parseInt(win_sequence) > parseInt(board_size)){
		console.error("ERROR- I think you need a bigger board");
		Error;
	}
	else
	{
		printboard(board_size);
		startGame();
	}
	//new newGame= game(players,board_size,win_sequence,array) 	
}



/** Using module 'readline-sync' **/

let fileName = readline.question("Hello USER, enter the file name if you wish to load a saved game or press enter to start a new game:");
if(fileName==''){
	newGame();
}
else{
	loadGame(fileName);
}
	