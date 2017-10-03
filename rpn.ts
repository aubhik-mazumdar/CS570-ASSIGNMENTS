import * as readline from 'readline-sync';

main();

function main(){
	let read:string='';
	while(true){
		read = readline.question('enter expression: ');
		if(read === 'quit')
			return;
		let res:string = read.replace(/ /g,"");
		res = res.replace(/POW/g,"^");
		let infix = res.split('');
		let str = convert(infix);
		calculate(str);
	}
}


function precedence(t:string){
	if(t == '+' || t=='-')
		return 3;
	if(t == '*' || t=='/')
		return 1;
	let pre = '^*/+-%';
	return pre.indexOf(t);
}

function convert(infix:string[])
{
	let stack = new Array();
	let postfix = new Array();
	while(infix.length)
	{
	let t:string='';
	t = infix.shift()
	if(parseInt(t) || t=='0'){
		let num:string='';
		num+=t;
		for(let i=0;i<infix.length;i++){
			if(parseInt(infix[i]) || infix[i]=='0' || infix[i]=='.')
				num+=infix[i];
			else
				break;
		}
		infix=infix.slice(num.length-1);
		postfix.push(num);
		
	}
	else if(stack.length==0)
		stack.push(t);
	else if(t ==='(')
		stack.push(t);
	else if(t === ')'){
		while(stack[stack.length-1]!='('){
			postfix.push(stack.pop())
		}
		stack.pop();
	}
	else{
		while(stack.length!=0 && stack[stack.length-1] != '(' && precedence(t) >= precedence(stack[stack.length-1])){
			postfix.push(stack[stack.length-1]);
			stack.pop();
		} 
		stack.push(t);
		}
	}
	while(stack.length!=0){
		postfix.push(stack[stack.length-1]);
		stack.pop();
}
let x = postfix.join(" ");
console.log("THE POSTFIX EXPRESSION IS-");
console.log(x);
return postfix;
}

function calculate(postfix){
    
    let cal=[];
    
    let topNum,nextNum,answer;
    

    while(postfix.length!=0){
        let t = postfix.shift();

        if(parseFloat(t)){
            cal.push(parseFloat(t));
            continue
        }

        else{
        let topNum = cal.pop();
        let nextNum = cal.pop();
    
    switch(t){
        case '+': answer = nextNum + topNum;break;
        case '-': answer = nextNum - topNum;break;
        case '*': answer = nextNum * topNum;break;
        case '/': answer = nextNum / topNum;break;
        case '^': answer = Math.pow(nextNum,topNum);break;
    }
    cal.push(answer);
    }
	}
	console.log("THE RESULT OBTAINED IS-")
	console.log(cal.pop());
}
