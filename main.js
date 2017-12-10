//Assumed status and print_table as the functions of router

const readline = require('readline-sync');
const fs = require('fs');

function main(){
   while(true){
        console.log("If you want to continue Enter: C");
        console.log("If you want to quit Enter: Q");
        console.log("If you want to print the routing table of a router, example for router 1 Enter: P 1");
        console.log("If you want to shut down a router,example for router 1 Enter: S 1");
        console.log("If you want to start up a router,example for router 1 Enter: T 1");

        var p=readline.question('Enter: ');
        var p=p.toUpperCase().split(' ');

        if(p.length==1)
			{
				if(p[0] =="C")
                    continue;
                
                else if(p[0]=="Q")
					break;
                
                else
					console.log("please input the right format!\n");
            }

        else if (p.length==2){
            
           if(p[0]=="P"){
                    
                    if (router[p[1]].status == "start") {                        //To check the status of the router 
                    console.log(router[p[1]].print_table);                       // To print routing table
                         }
                    
                    else {
                    console.log(p + " is shutdown now");
                         }
                }

            else if (p[0] == "S") {
                router[p[1]].status = "stop";                                    //To stop the router
                }

            else if (p[0] == "T") {
                router[p[1]].status = "start";                                  //To start the router
                }
                
            else
				console.log("please input the right format!\n");    
        }
            
    else
    {
        console.log("Please Input the right format!\n")
    }
}
}

main();