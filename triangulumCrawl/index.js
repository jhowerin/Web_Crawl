var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

var initial_URL = 'http://www.espn.com';
var maxDepth = 10;

var search_queue = [initial_URL];
var nodes_visited = [];
var number_of_pages = 0;

//in the sample code, we'll just visit a few pages so we'll use the number_of_pages var
//to terminate at a certain value (say 10 pages).


//this is how you push - this goes to the end of the queue
//search_queue.push(secondURL);
//This is how you remove from the front of the queue
//search_queue.shift()


//Begin Crawler
function crawl(){

  if(number_of_pages > 5){
    console.log("We've reached our max");
    return;
  }
  //crawl
  // pop the current node from the search_queue - ie shift
  var current = search_queue.shift();
  // push the current node to the nodes_visisted list
  nodes_visited.push(current);
  number_of_pages++;

  //visit URL
  // pretty verbatim from npm request documentation except for the current var
  request(current, function(error, response, body) {
    console.log('error:', error);
    console.log('status code:', response && response.statusCode);
    console.log('body:', body);

    // so now we have the web page body ready for parsing using cheerio
    // see example from the cheerio npm documentation
    const $ = cheerio.load(body);
    link = $("a");
    search_queue.push(link);

  });

  crawl();

}

function printQueue(){
  console.log("---Search Queue---");
  for(var i in search_queue){
    console.log(search_queue[i]);
  }
  console.log("---Nodes Visited---");
  for(var i in nodes_visited){
    console.log(nodes_visited[i]);
  }
  //console.log(search_queue.length);
  //console.log(nodes_visited.length);
}

crawl();
printQueue();
