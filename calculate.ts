import * as readline from 'readline-sync';

let read: string = readline.question('enter expression: ');
let infix = read.split('');
let stack = new Array();
let postfix = new Array();


let str = convert(infix);

calculate(str);

function precedence(t:string){
	let pre = '*/+-%';
	return pre.indexOf(t);
}

function convert(infix:string[])
{
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
return postfix;

}

function calculate(postfix){
    
    let cal=[];
    
    let topNum,nextNum,answer;
    

    while(postfix.length!=0){
        let t = postfix.shift();

        if(t.type =="NUM"){
            cal.push(parseFloat(t.val));
            continue
        }

        else{
        let nextNum = cal.pop();
        let topNum = cal.pop();
    
    switch(t){
        case '+': answer = nextNum + topNum;break;
        case '-': answer = nextNum - topNum;break;
        case '*': answer = nextNum * topNum;break;
        case '/': answer = nextNum / topNum;break;
        case '^': answer = Math.pow(nextNum,topNum);break;
    }
    cal.push(answer);
    }
    return cal.pop();
}
}
