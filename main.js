//Assumed status and print_table as the functions of router

const readline = require('readline-sync');
const fs = require('fs');
var prompt = require("prompt-sync");

function main(){
   while(true){
        console.log("If you want to continue enter C");
        console.log("If you want to quit enter Q");
        console.log("if you want to print the routing table of a router, example: for router 1 enter: P 1");
        console.log("If you want to shut down a router,example for router 1 enter: S 1");
        console.log("If you want to start up a router,example for router 1 enter: T 1");

        var p = prompt('');
        
        if (p.charAt(0).toUpperCase() == "C") {
           continue;                                                             //originatePacket()
        }
        
        else if(p.charAt(0).toUpperCase() =="Q"){
            break;
        }
        
        else if (p.charAt(0).toUpperCase() == "P") {

            if (router[p.charAt(2)].status == "start") {                        //To check the status of the router 
                console.log(router[p.charAt(2)].print_table);                   // To print routing table
            }
            else {
                console.log(p + " is shutdown now");
            }
        }
        
        else if (p.charAt(0).toUpperCase() == "S") {
        router[p.charAt(2)].status = "stop";                                    //To stop the router
        }
        
        else if (p.charAt(0).toUpperCase() == "T") {
        router[p.charAt(2)].status = "start";                                  //To start the router
        }
    
        else
    {
        console.log("Please Input the right format")
    }
}
}

main();