let vis = [];
let dfsOrder = [];
let dfsParent = []; //i is the parent of dfsParent[i]
for (let i = 0; i < 1000; i++){
    vis.push(false);
}

function resetDfs(){
    dfsOrder = new Array;
    vis = new Array;
    dfsParent = new Array;
    for (let i = 0; i < nodeNum; i++){
        vis.push(false);
        dfsParent.push(-1);
    }
}

function dfs(u){
    vis[u] = true;
    dfsOrder.push(u);

    for (const v of graph[u]){
        if (!vis[v]){
            dfs(v);
            dfsParent[v] = u;
        }
    }
}