const stream = require('stream');
const fs = require('fs');
const readline = require('readline-sync');

function game(p,bs,w,arr){ //creates a game object

	this.players = p;
	this.board_size = bs;
	this.win_sequence = w;
	this.array = arr;
}

function displayBoard(chars){ //displays the board
	//console.log(chars);
/* -----
	-----PRINT BOARD WITH SYMBOLS IN RIGHT PLACES
	----
*/
}

function saveGame(game){ // saves input to solution.txt
let obj=JSON.stringify(game);
fs.writeFileSync("Solution.txt",obj);
}

function checkWin(lastmove,moves,win,bs,darray){ // checks for win, displays the moves of players on board
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
	console.log(chars);
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
					return; 
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
					return;
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
					return;
				}
			}
			wincount=0;
			k=0;
		}
	}
}	

function checkMove(gameObject,turn,darray){ //checking the wins
	displayBoard();
	moves = gameObject["array"];
	let lastMove = moves[moves.length-1];
	checkWin(lastMove,moves,gameObject['win_sequence'],gameObject['board_size'],darray);
}

function startGame(p,bs,w){ //Starts a new game
	let symbols="XOABCDEFGHIJKLMNPQRSTUVWYZ",s='';
	let arr=[],turn=0;
	let ngame= new game(p,bs,w,arr);
	console.log(ngame); 
	printboard(bs);
	let darray = [];
	for(i=0;i<bs;i++){
		darray.push(Array(bs).fill(' '));
	}
	while(1)
	{
		move=readline.question("Enter your move player "+ (turn % p) +" , row and column, or Q to quit or s to save the game, or l to load:");
		if(move === 'Q' || move ==='q')
			break;
		if(move==='s' || move === 'S')
			{
				saveGame(ngame);
				break;
			}
		if(move==='l' || move === 'L')
			{
				//loadGame(ngame);
				break;
			}
		[row,column]=move.split(" ");
		s=symbols.charAt(turn % p);
		ngame["array"].push([row,column,s]);
		checkMove(ngame,turn,darray);
		turn+=1;
	}
}

function printboard(board_size){ //displays and prints the board
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

function loadGame(fileName){ //loads the saved game
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



function newGame(){ //Starts the new game
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
	
				//console.log(players,board_size,win_sequence);
	
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
