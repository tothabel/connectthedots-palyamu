let distances = new Array;
let dijkstraOrder = [];
let dijkstraParent = []; //i is the parent of dijkstraParent[i]

function minDistance(dist, vis){
	
	// Initialize min value
	let min = Number.MAX_VALUE;
	let min_index = -1;
	
	for(let v = 0; v < nodeNum; v++){
		if (vis[v] == false && dist[v] <= min){
			min = dist[v];
			min_index = v;
		}
	}
	return min_index;
}

function dijkstra(){
	let dist = new Array(nodeNum);
	let vis = new Array(nodeNum);
	dijkstraParent = new Array(nodeNum);
	dijkstraOrder = new Array;

	dijkstraParent[Startid] = -1;
	

	for(let i = 0; i < nodeNum; i++){
		dist[i] = Number.MAX_VALUE;
		vis[i] = false;
		dijkstraParent.push(-1)
	}
	
	dist[Startid-1] = 0;
	
	for(let count = 0; count < nodeNum; count++){
		let u = minDistance(dist, vis);
		
		vis[u] = true;

        dijkstraOrder.push(u);
		
		for(let v = 0; v < nodeNum; v++){
			
			if (!vis[v] && weights[u][v] != 0 &&
				dist[u] != Number.MAX_VALUE &&
				dist[u] + weights[u][v] < dist[v])
            {
				dist[v] = dist[u] + weights[u][v];
				dijkstraParent[v+1] = u+1;
			}
		}

	}

	console.log(dist[Endid-1]);
}
