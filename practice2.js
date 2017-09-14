const readline = require('readline-sync');


function function2(arr){
	let odd=[],even=[],answer = [];
	for(let i=0;i<arr.length;i++){
		if(arr[i] % 2){
			odd.push(arr[i]);
		}
		else{
			even.push(arr[i]);
		}
	}
	odd.sort(function(a,b){return a-b});
	even.sort(function(a,b){return a-b});
	answer = even.concat(odd);
	console.log(answer);
	console.log(even.length,odd.length);
}


let main = n => {
	let num=0;
	v = readline.question("Enter the Integer:");
	if(n = parseInt(v,10))
	{
		console.log("Integer");
		arr = [];
		for(i=0;i<v;i++){
			num = Math.floor(Math.random() * 50);
			arr.push(num);
		}
		console.log(arr);
		function2(arr);
	}
	else
	{
		throw 'not an integer';
		main();
	}
}


main();
