function bfsDepth(){
    let depth = [];
    let q = [];
    let vis = [];
    for (let i = 0; i < 1000; i++){
        vis.push(false);
        depth.push(-1);
    }
    vis[Startid] = true;
    q.push(Startid);
    depth[Startid] = 0;

    while(q.length > 0){
        let at = q[0];
        for (let i of graph[at]){
            if (!vis[i]){
                vis[i] = true;
                q.push(i);
                depth[i] = depth[at] + 1;
            }
        }
        q.shift();
    }
    return depth;
}

function bfsParent(){
    let parent = []; //i is the child of parent[i]
    for (let i = 0; i < 1000; i++){
        parent.push(-1);
    }

    let q = [];
    let vis = [];
    for (let i = 0; i < 1000; i++){
        vis.push(false);
    }
    vis[Startid] = true;
    q.push(Startid);

    while(q.length > 0){
        let at = q[0];
        for (let i of graph[at]){
            if (!vis[i]){
                vis[i] = true;
                q.push(i);
                parent[i] = at;
            }
        }
        q.shift();
    }
    return parent;
}