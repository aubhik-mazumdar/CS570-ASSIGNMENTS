let fs= require('fs');

var text= fs.readFileSync("./article.dat").toString('utf-8');

var tw= text.split(/\s+/);
console.log(tw);

function trieNode(key){
	this.key=key;
	this.parent=null;
	this.children={};
	this.end=false;
}

trieNode.prototype.getWord = function() {
  var output = [];
  var node = this;
  
  while (node !== null) {
    output.unshift(node.key);
    node = node.parent;
  }
  
  return output.join('');
};


function Trie(){ //implement trie with root
	this.root=new trieNode(null);
}

Trie.prototype.add=function(word){ //insert word into trie
	var node=this.root; //starting from root
	for(var i=0;i<word.length;i++)
		if (!node.children[word[i]]) {
			node.children[word[i]]=new trieNode(word[i]);
			node.children[word[i]].parent=node;
		}

		node=node.children[word[i]];
		if(i==word.length-1){
			node.end=true;

		}
 };
var trie=new Trie(); // Instantiate the trie

trie.add("microsoft"); // insert values
trie.add("google");
trie.add(tw.toString());
