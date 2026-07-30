function create_adj_list_old(nodes, links){
    let adj_list = {}
    // ...
    
    // Initialize adjacency list for each node
    for (const node in nodes) {
        adj_list[node] = []
    }
    
    // Build adjacency list from links (undirected graph)
    for (const link of links) {
        const source = link.source
        const target = link.target
        
        // Add edge in both directions for undirected graph
        if (adj_list[source]) {
            adj_list[source].push(target)
        }
        /*if (adj_list[target]) {
            adj_list[target].push(source)
        }*/
    }
    
    return adj_list
}

function create_adj_list(nodes, links){
    let adj_list = {}
    // ...
    
    // Initialize adjacency list for each node
    for (const node in nodes) {
        adj_list[node] = []
    }
    
    // Build adjacency list from links (undirected graph)
    for (const link of links) {
        const source = link.source
        const target = link.target
        
        // Add edge in both directions for undirected graph
        if (adj_list[source]) {
            adj_list[source].push(target)
        }
        if (adj_list[target]) {
            adj_list[target].push(source)
        }
    }
    
    return adj_list
}

function bfs_edges(adj_list) {
    const visited = new Set();
    const edges = [];

    for (const start in adj_list) {
        if (visited.has(start)) continue;

        const queue = [start];
        visited.add(start);

        while (queue.length > 0) {
            const u = queue.shift();

            for (const v of adj_list[u]) {
                if (!visited.has(String(v))) {
                    visited.add(String(v));
                    queue.push(String(v));

                    // Edge used to discover v
                    edges.push({
                        source: Number(u),
                        target: Number(v)
                    });
                }
            }
        }
    }

    return edges;
}

function bfs_edges_old(adj_list) {
    const visited = new Set();
    const edges = [];

    for (const start in adj_list) {
        //console.log("start", start)
        if (visited.has(start)) continue;

        const queue = [Number(start)];
        visited.add(start);

        while (queue.length > 0) {
            const u = queue.shift();
            //console.log("Parent", u)

            for (const v of adj_list[u]) {
                // Emit every outgoing edge
                edges.push({
                    source: u,
                    target: v
                });

                // Only queue unseen vertices
                if (!visited.has(String(v))) {
                    visited.add(String(v));
                    queue.push(v);
                }
            }
        }
    }

    return edges;
}

function init_nodes_links(){
    //nodes = []
    links = []
    non_isolated_nodes = {}
    next_node = -1
    next_ngbr = -1
    adj_list = create_adj_list(nodes, links_org)
    let [x, y] = getCenterBoundary(boundaryPoints)
    centerX = x
    centerY = y
}

/*function init_given_layout(){
    non_isolated_nodes = {}
    for(nodeID in nodes){
        non_isolated_nodes[nodeID] = nodes[nodeID]
    }
    links = []
    for(new_link of links_org){
        links.push(new_link)
    }
}*/

function init_given_layout() {
    const non_isolated_nodes = {};

    for (const nodeID in nodes) {
        non_isolated_nodes[nodeID] = nodes[nodeID];
    }

    const links = [];

    for (const new_link of links_org) {
        links.push(new_link);
    }

    return {
        non_isolated_nodes,
        links
    };
}

/*const {
    non_isolated_nodes: nodes_main,
    links: links_main
} = init_given_layout();*/

function get_bfs_links(){
    bfs_links = bfs_edges(adj_list)
    next_edge_ind = 0
}

function find_node(node_id, node_list){
    /*for(var i=0;i<node_list.length;i++){
        if(node_list[i].id==node_id)
            return true
    }
    return false*/
    return node_id in node_list
}

function initPosition(node){
    node.x = centerX + Math.random()*.1
    node.y = centerY + Math.random()*.1
}

function addNode(nodeID){
    non_isolated_nodes[nodeID] = nodes[nodeID]
    non_isolated_nodes[nodeID]['insert_time'] = Object.keys(non_isolated_nodes).length
    initPosition(nodes[nodeID])
}

function update_new_link(nodes, links, new_link){
    console.log("Link added:", new_link)

    if(crossings_from_nodes(non_isolated_nodes, links)){
        //let attempt = 10
        let attempts = 0
        //while(crossings_from_nodes(non_isolated_nodes, links) && attempt>0){
        while(crossings_from_nodes(non_isolated_nodes, links)){
            console.log("Crossing! Updating position.")
            let source = new_link.source
            let target = new_link.target
            if(nodes[source].insert_time>nodes[target].insert_time){
                let t = source
                source = target
                target = t
            }
            let start = nodes[source]
            let end = nodes[target]
            let new_pos = getPointAlongLine(start, end, percent = 0.95)
            nodes[target].x = new_pos.x
            nodes[target].y = new_pos.y
            //attempt -= 1

            attempts++
            
            // 3. Every 1000 attempts, prompt the user to continue or break
            if (attempts % 1000 === 0) {
                let proceed = confirm(`Tried ${attempts} times to resolve link crossings. Keep trying?`);
                if (!proceed) {
                    console.log("User stopped the link update loop after", attempts, "attempts.");
                    break; // Exits the while loop immediately
                }
            }
        }
    }
    else
        console.log("New link has no crossing")
}

function next_edge_old(){
    if(next_ngbr==-1){
        next_node = 0
        next_ngbr = 0

        //nodes = [{id:next_node, x: nodes_org[next_node]['x'], y: nodes_org[next_node]['y'], label: nodes_org[next_node]['label']}]
        let target = adj_list[next_node][next_ngbr]
        let new_link = {source:next_node, target:target}
        links = [new_link]
        /*if(!find_node(target, nodes)){
            nodes.push({id:target, x: nodes[target]['x'], y: nodes[target]['y'], label: nodes_org[target]['label']})
        }*/
        if(!find_node(next_node, non_isolated_nodes)){
            //non_isolated_nodes.push({id:target, x: nodes[target]['x'], y: nodes[target]['y'], label: nodes[target]['label']})
            //non_isolated_nodes[next_node] = {id:next_node, x: nodes[next_node]['x'], y: nodes[next_node]['y'], label: nodes[next_node]['label']}
            //non_isolated_nodes[next_node] = nodes[next_node]
            addNode(next_node)
        }
        if(!find_node(target, non_isolated_nodes)){
            //non_isolated_nodes.push({id:target, x: nodes[target]['x'], y: nodes[target]['y'], label: nodes[target]['label']})
            //non_isolated_nodes[target] = {id:target, x: nodes[target]['x'], y: nodes[target]['y'], label: nodes[target]['label']}
            //non_isolated_nodes[target] = nodes[target]
            addNode(target)
        }
        update_new_link(non_isolated_nodes, links, new_link)
    }
    else if(adj_list[next_node].length>(next_ngbr+1)){
        next_ngbr += 1

        let target = adj_list[next_node][next_ngbr]
        if(target!=undefined){
            let new_link = {source:next_node, target:target}
            links.push(new_link)
            /*if(!find_node(target, nodes)){
                nodes.push({id:target, x: nodes[target]['x'], y: nodes[target]['y'], label: nodes_org[target]['label']})
            }*/
            if(!find_node(next_node, non_isolated_nodes)){
                //non_isolated_nodes.push({id:target, x: nodes[target]['x'], y: nodes[target]['y'], label: nodes[target]['label']})
                //non_isolated_nodes[next_node] = {id:next_node, x: nodes[next_node]['x'], y: nodes[next_node]['y'], label: nodes[next_node]['label']}
                //non_isolated_nodes[next_node] = nodes[next_node]
                addNode(next_node)
            }
            if(!find_node(target, non_isolated_nodes)){
                //non_isolated_nodes.push({id:target, x: nodes[target]['x'], y: nodes[target]['y'], label: nodes[target]['label']})
                //non_isolated_nodes[target] = {id:target, x: nodes[target]['x'], y: nodes[target]['y'], label: nodes[target]['label']}
                //non_isolated_nodes[target] = nodes[target]
                addNode(target)
            }
            update_new_link(non_isolated_nodes, links, new_link)
        }
    }
    else if(Object.keys(adj_list).length>(next_node+1)){
        next_node += 1
        next_ngbr = 0

        //if(!find_node(next_node, nodes)){
        //    nodes.push({id:next_node, x: nodes_org[next_node]['x'], y: nodes_org[next_node]['y'], label: nodes_org[next_node]['label']})
        //}
        let target = adj_list[next_node][next_ngbr]
        //console.log(adj_list, next_node, next_ngbr)
        if(target!=undefined){
            let new_link = {source:next_node, target:target}
            links.push(new_link)
            /*if(!find_node(target, nodes)){
                nodes.push({id:target, x: nodes[target]['x'], y: nodes[target]['y'], label: nodes_org[target]['label']})
            }*/
            if(!find_node(next_node, non_isolated_nodes)){
                //non_isolated_nodes.push({id:target, x: nodes[target]['x'], y: nodes[target]['y'], label: nodes[target]['label']})
                //non_isolated_nodes[next_node] = {id:next_node, x: nodes[next_node]['x'], y: nodes[next_node]['y'], label: nodes[next_node]['label']}
                //non_isolated_nodes[next_node] = nodes[next_node]
                addNode(next_node)
            }
            if(!find_node(target, non_isolated_nodes)){
                //non_isolated_nodes.push({id:target, x: nodes[target]['x'], y: nodes[target]['y'], label: nodes[target]['label']})
                //non_isolated_nodes[target] = {id:target, x: nodes[target]['x'], y: nodes[target]['y'], label: nodes[target]['label']}
                //non_isolated_nodes[target] = nodes[target]
                addNode(target)
            }
            update_new_link(non_isolated_nodes, links, new_link)
        }
    }
}

function next_edge() {
    if (next_edge_ind >= bfs_links.length) {
        return; // No more edges
    }

    const new_link = bfs_links[next_edge_ind++];

    // First edge initializes the links array
    if (links.length === 0) {
        links = [new_link];
    } else {
        links.push(new_link);
    }

    const source = new_link.source;
    const target = new_link.target;

    if (!find_node(source, non_isolated_nodes)) {
        addNode(source);
    }

    if (!find_node(target, non_isolated_nodes)) {
        addNode(target);
    }

    update_new_link(non_isolated_nodes, links, new_link);
}

function remove_link(nodes, links, removeSource, removeTarget) {
    const nodeArray = Object.values(nodes);

    const labelToId = Object.fromEntries(
        nodeArray.map(node => [node.label, node.id])
    );

    const sourceId = labelToId[removeSource];
    const targetId = labelToId[removeTarget];

    return links.filter(link => !(
        (link.source === sourceId && link.target === targetId) ||
        (link.source === targetId && link.target === sourceId)
    ));
}

function connected_components(adj_list) {
    const visited = new Set();
    const components = [];

    for (const start in adj_list) {
        if (visited.has(start)) continue;

        const queue = [start];
        visited.add(start);

        const component = [];

        while (queue.length > 0) {
            const node = queue.shift();
            component.push(Number(node)); // remove Number() if you want string IDs

            for (const neighbor of adj_list[node]) {
                const neighborStr = String(neighbor);

                if (!visited.has(neighborStr)) {
                    visited.add(neighborStr);
                    queue.push(neighborStr);
                }
            }
        }

        components.push(component);
    }

    return components;
}

function get_partial_tree(nodes, links, removeSource, removeTarget) {
    // Remove the specified edge
    const new_links = remove_link(nodes, links, removeSource, removeTarget);

    // Build adjacency list and find connected components
    const adj_list = create_adj_list(nodes, new_links);
    const components = connected_components(adj_list);

    // Find the ID of removeTarget
    const targetNode = Object.values(nodes).find(
        node => node.label === removeTarget
    );

    if (!targetNode) {
        return [];
    }

    const targetId = targetNode.id;

    // Find the component containing removeTarget
    const component = components.find(c => c.includes(targetId));

    if (!component) {
        return [];
    }

    const componentSet = new Set(component);

    // Return only links entirely inside that component
    return new_links.filter(link =>
        componentSet.has(link.source) &&
        componentSet.has(link.target)
    );
}

/*
boundaryPoints.push({ x:10, y:15 }, { x:50, y:15 }, { x:50, y:60 }, { x:10, y:60 });
init_k_temp()
init_nodes_links()
get_bfs_links()
next_edge()
draw(non_isolated_nodes, links)
step(non_isolated_nodes, links)


boundaryPoints.push({ x:1360, y:-1000 }, { x:1360, y:1940 }, { x:-300, y:1940 }, { x:-300, y:-1000 });
init_k_temp()
const {
    non_isolated_nodes: nodes_main,
    links: links_main
} = init_given_layout();
draw(nodes_main, links_main)
step(nodes_main, links_main)
partial_links = get_partial_tree(nodes_main, links_main, "molecular biolog", "microbiology")
console.log(partial_links)
 */