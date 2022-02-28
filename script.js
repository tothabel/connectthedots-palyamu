//declare variables
const rows = 20;
const colls = 50;
const nodeNum = colls*rows;
const grid = document.createElement('div');

let Startid = colls * 10 + 10;
let Endid = colls * 10 + 40;

//keycode boolians
let SisDown = false;
let EisDown = false;
let DisDown = false;
let WisDown = false;

var isMouseDown = false;

//dfs, bfs or dijkstra
let bfsBool = false;
let dfsBool = false;
let dijkstraBool = false;


//init grid and tiles
grid.className = "grid";
for (let i = 1; i <= nodeNum; i++){
    const tile = document.createElement('button');
    tile.className = "tile-unvisited";
    tile.onmousemove = function() { 
        if(isMouseDown)
        handleTilePressed(i) 
    }
    tile.id = "tile-" + (i);
    grid.appendChild(tile);
}
document.body.appendChild(grid);

//init start, end tiles
document.getElementById("tile-" + Startid).className = "tile-start";
document.getElementById("tile-" + Endid).className = "tile-end";

//declare graph
let graph = [,];
//init graph (connections are between horizontaly and verticaly adjacent tiles)
for (let i = 0; i < nodeNum; i++)
    graph.push([]);

for (let i = 1; i <= nodeNum; i++){
    if ((i - 1) % colls != 0)
        graph[i].push(i-1);
    if (i % colls != 0)
        graph[i].push(i+1); 
    if (i - colls > 0)
        graph[i].push(i-colls);
    if (i + colls < nodeNum + 1)
        graph[i].push(i+colls);
}

//wheights
let weights = [];
const weightAmount = 5;

//event listeners
document.addEventListener('keydown', function(event) {
    if(event.keyCode == 83)
        SisDown = true;
    if (event.keyCode == 69)
        EisDown = true;
    if (event.keyCode == 68)
        DisDown = true;
    if (event.keyCode == 87)
        WisDown = true;
});

document.addEventListener('keyup', function(event) {
    if(event.keyCode == 83)
        SisDown = false;
    if (event.keyCode == 69)
        EisDown = false;
    if (event.keyCode == 68)
        DisDown = false;
    if (event.keyCode == 87)
        WisDown = false;
});

var isMouseDown = false;
window.addEventListener('mousedown', e => {
  x = e.offsetX;
  y = e.offsetY;
  // Use this x and y to determine if your mouse is at certain position
  isMouseDown = true
});

window.addEventListener('mouseup', e => {
isMouseDown = false
});

document.getElementById("dfs").addEventListener('click', dfsClicked);
document.getElementById("bfs").addEventListener('click', bfsClicked);
document.getElementById("dijkstra").addEventListener('click', dijkstraClicked);

document.getElementById("clearBoard").addEventListener('click', clearBoard);

document.getElementById("random").addEventListener('click', randomMaze);


//FUNCTIONS

function handleTilePressed(i) {
    console.log(document.getElementById("tile-" + i).className);
    //place start node
    if (SisDown && Endid != i){
        document.getElementById("tile-" + Startid).className = "tile-unvisited";
        Startid = i;
        document.getElementById("tile-" + i).className = "tile-start";
    }
    //place end node
    if (EisDown && Startid != i){
        document.getElementById("tile-" + Endid).className = "tile-unvisited";
        Endid = i;
        document.getElementById("tile-" + i).className = "tile-end";
    }
    //create weight
    if (!EisDown && !SisDown && !DisDown && WisDown && Endid != i && Startid != i && document.getElementById("tile-" + i).className == "tile-unvisited"){
        document.getElementById("tile-" + i).className = "tile-weight";
    }
    //create wall
    if (!EisDown && !SisDown && !DisDown && Endid != i && Startid != i && document.getElementById("tile-" + i).className == "tile-unvisited"){
        document.getElementById("tile-" + i).className = "tile-wall";
    }
    //destroy wall, weight
    if (!EisDown && !SisDown && DisDown && Endid != i && Startid != i){
        if (document.getElementById("tile-" + i).className == "tile-wall" || document.getElementById("tile-" + i).className == "tile-weight")
            document.getElementById("tile-" + i).className = "tile-unvisited";
    }
}

function dfsClicked(){
    dfsBool = true;
    bfsBool = false;
    dijkstraBool = false;
    document.getElementById("currentAlgorithm").innerHTML = "Algortimus: DFS";
}
function bfsClicked(){
    dfsBool = false;
    bfsBool = true;
    dijkstraBool = false;
    document.getElementById("currentAlgorithm").innerHTML = "Algortimus: BFS";
}
function dijkstraClicked(){
    dfsBool = false;
    bfsBool = false;
    dijkstraBool = true;
    document.getElementById("currentAlgorithm").innerHTML = "Algortimus: Dijkstra";
}

function clearBoard(){
    graph = [,];

    for (let i = 0; i < nodeNum; i++)
        graph.push([]);

    for (let i = 1; i <= nodeNum; i++){
        if ((i - 1) % colls != 0)
            graph[i].push(i-1);
        if (i % colls != 0)
            graph[i].push(i+1); 
        if (i - colls > 0)
            graph[i].push(i-colls);
        if (i + colls < nodeNum + 1)
            graph[i].push(i+colls);
    }

    for (let i = 1; i <= nodeNum; i++){
        if (i == Startid)
            document.getElementById("tile-" + i).className = "tile-start";
        else if (i == Endid)
            document.getElementById("tile-" + i).className = "tile-end";
        else if (i != Startid && i != Endid)
            document.getElementById("tile-" + i).className = "tile-unvisited";
    }
}
   

//VISUALIZE
document.getElementById("visualize").onclick = function(){visualize()};

function visualize(){
    console.log("visualize");

    //get wall tiles' id
    let walls = [];
    for (let i = 1; i <= nodeNum; i++){
        if (document.getElementById("tile-" + i).className == "tile-wall")
            walls.push(i);
    }

    //remove walled connections from graph
    for (const w of walls){ //w = one of the wall id's
        for (let i = 1; i <= nodeNum; i++){
            if (w == i) //if i is a wall remove all its connections
                graph[i] = new Array;
            const wallConnection = graph[i].indexOf(w); //get the wall connections of node i
            if (wallConnection != -1) //if it has a wall connection remove it
                graph[i].splice(wallConnection, 1);
        }
    }

    if (bfsBool){
        //bfsDepth
        let depth = [];
        depth = bfsDepth();

        //bfsParent
        let parent = []; //i is the child of parent[i]
        parent = bfsParent();

        //change unvisited nodes to visited gradually
        myLoop(); 
        var i = 1;
        function myLoop() {
            setTimeout(function() {
                
                let nextVisiteds = [];
                    for (let j = 1; j <= nodeNum; j++){
                        if (depth[j] == i)
                            nextVisiteds.push(j);
                    }
                    for (let j = 0; j < nextVisiteds.length; j++){
                        document.getElementById("tile-" + (nextVisiteds[j])).className = "tile-visited";
                    }
                i++;
                if (i < depth[Endid]) {
                myLoop();             
                }
                else {
                    drawRoute();
                }
            }, 50)
        }

        function drawRoute(){
            //when finished draw the route
            let route = [];
            let currentNode = parent[Endid];
            while (currentNode != Startid){
                route.push(currentNode);
                document.getElementById("tile-" + currentNode).className = "tile-route";
                currentNode = parent[currentNode];
            }
            
        }
    }

    if (dfsBool){
        resetDfs();
        dfs(Startid);
        //console.log(dfsOrder);

        //change unvisited nodes to visited gradually
        dfsLoop(); 
        var i = 1;
        function dfsLoop() {
            setTimeout(function() {
                
                document.getElementById("tile-" + dfsOrder[i]).className = "tile-visited";
                
                i++;
                if (dfsOrder[i] != Endid) {
                dfsLoop();             
                }
                else {
                    //draw route
                    drawDfsRoute();
                }
            }, 25)
        }

        function drawDfsRoute(){
            let currentNode = dfsParent[Endid];
            while (currentNode != Startid){
                document.getElementById("tile-" + currentNode).className = "tile-route";
                currentNode = dfsParent[currentNode];
            }
        }

    }

    if (dijkstraBool){
        weights = [];
        for (let i = 1; i <= nodeNum; i++){
            if (document.getElementById("tile-" + i).className == "tile-weight")
                weights.push(i);
        }
        console.log(weights);
    }

    if (!dfsBool && !bfsBool && !dijkstraBool){
        alert("Nincs kiválasztva algoritmus!")
    }

}