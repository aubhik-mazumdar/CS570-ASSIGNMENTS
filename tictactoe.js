/*

CS 570(A)
GROUP MEMBERS
Mrunmayee Salunke
Aubhik Mazumdar
Siddhesh Prabhu

TIC TAC TOE
 */



const stream = require('stream');
const fs = require('fs');
const readline = require('readline-sync');


//creates a game object
function game(p,bs,w,arr){
	this.players = p;
	this.board_size = bs;
	this.win_sequence = w;
	this.array = arr;
}

//displays the board
function displayBoard(chars){
/* -----
	-----PRINT BOARD WITH SYMBOLS IN RIGHT PLACES
	----
*/
}

// saves input to solution.txt
function saveGame(game){
let obj=JSON.stringify(game);
fs.writeFileSync("solution.txt",obj);
}

// checks for win, displays the moves 
function checkWin(lastmove,moves,win,bs,darray){
	let rn=0,cn=0,s='',r=0,c=0,sym="",count=0,chars = "";
	[rn,cn,s]  = lastmove;
	let wincount=0,i=0,j=0,k=0;
	for(i in moves){
		r = parseInt(moves[i][0])-1;
		c = parseInt(moves[i][1])-1;
		sym = moves[i][2];
		darray[r][c]= sym;
		chars += sym;
	}
	console.log(darray);
	displayBoard(chars);

	//for each cell
	for(i=0;i<bs;i++)
	{
		for(j=0;j<bs;j++)
		{
			//check for row

			while(i<bs && j+k<bs && darray[i][j+k]==s)
			{
				k++;
				wincount+=1;
				if(wincount==win){
					console.log("player " + s + " wins");
					return 1; 
				}
			}
			wincount=0;
			k=0;
			//check for column
			while(i+k<bs && j<bs && darray[i+k][j]==s)
			{
				k++;
				wincount+=1;
				if(wincount==win){
					console.log("player " + s + " wins");
					return 1;
				}
			}
			wincount=0;
			k=0;
			//check for diagonal
			while(i+k<bs && j+k<bs && darray[i+k][j+k]==s)
			{
				k++;
				wincount+=1;
				if(wincount==win){
					console.log("player " + s + " wins");
					return 1;
				}
			}
			wincount=0;
			k=0;
			break;
		}
	}
}	

//Check the viability of the moves(incomplete)
function checkMove(gameObject,turn,darray){
	moves = gameObject["array"];
	let lastMove = moves[moves.length-1];
	return checkWin(lastMove,moves,gameObject['win_sequence'],gameObject['board_size'],darray);
}


//Starts a new game
function startGame(p,bs,w,load){
	let symbols="XOABCDEFGHIJKLMNPQRSTUVWYZ",s='';
	let arr=[],turn=0;
	let ngame= new game(p,bs,w,arr);
	if(load === undefined){
		ngame= new game(p,bs,w,arr);
	}
	else{
		ngame = load;
		turn = ngame['array'].length;
	} 
	printboard(bs);
	let darray = [];
	for(i=0;i<bs;i++){
		darray.push(Array(bs).fill(' '));
	}
	while(1)
	{
		move=readline.question("Enter your move player "+ (turn % p) +" , row and column, or Q to quit or S to save the game:");
		if(move === 'Q' || move ==='q')
			break;
		if(move==='s' || move === 'S')
			{
				saveGame(ngame);
				break;
			}
		[row,column]=move.split(" ");
		s=symbols.charAt(turn % p);
		ngame['array'].push([row,column,s]);
		if(checkMove(ngame,turn,darray)==1)
			return;
		turn+=1;
		if (turn>bs*bs){
			console.log("TIE HAS OCCURED")
			return;
		}
	}
}

//displays and prints the board
function printboard(board_size){
	let i=1,j=1;
	process.stdout.write(" ");
	for(i=1;i<=board_size;i++){
		process.stdout.write(" ");
		process.stdout.write(i.toString());
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


//loads the saved game
function loadGame(fileName){
	let data;
	try{
		 data= fs.readFileSync(fileName);
			}
	catch (err) {
            console.log("File does not exist. ");
	}
	data = data.toString();
	let obj = JSON.parse(data);
	startGame(obj['players'],obj['board_size'],obj['win_sequence'],obj);

}

//Starts the new game
function newGame(){
	let players=0;
	let board_size=0;
	let win_sequence=0;

	console.log("Welcome to a New Game");
	
	players = readline.question("Enter the number of players :");
	
	if (players<2||players>26){
	console.error("Enter valid number of players between 2 to 26");
	Error;
	}
		else {
		board_size= readline.question("Enter the size of the board :");
		

		if(board_size<3 || players>999){
		console.error("Enter valid board size between 3 to 999");
		Error;
		}

		else if(parseInt(board_size*board_size) < parseInt(players)){
		console.error("Decrease number of players");
		Error;
		}
		
			else {
			win_sequence= readline.question("Enter the winning sequence count:");

			if(win_sequence<2){
			console.error("Please enter a winning sequence count >= 2");
			Error;
			}

			else if(win_sequence > board_size){
				console.error("I think you need a bigger board");
				Error;
				}

			else if(win_sequence==2 && players>8 && board_size==3){
			console.error("Decrease number of players OR increase win sequence");
			Error;
					}
	
				else
				{
					startGame(parseInt(players),parseInt(board_size),parseInt(win_sequence));
				}
			}
		}
	
}
/* Using module 'readline-sync' */
//MAIN FUNCTION START
let fileName = readline.question("Hello USER, enter the file name if you wish to load a saved game or press enter to start a new game:");
if(fileName==''){
	newGame();
}
else{
	loadGame(fileName);
}
