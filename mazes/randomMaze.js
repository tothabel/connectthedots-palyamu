function randomMaze(){
    clearBoard;

    for (let i = 1; i <= nodeNum; i++){
        if (i != Startid && i != Endid){
            const rand = Math.floor(Math.random() * 5);
            if (rand == 0)
                document.getElementById("tile-" + i).className = "tile-wall";
            else
                document.getElementById("tile-" + i).className = "tile-unvisited";
        }
    }
}