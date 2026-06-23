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
        /*if (adj_list[target]) {
            adj_list[target].push(source)
        }*/
    }
    
    return adj_list
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

function find_node(node_id, node_list){
    /*for(var i=0;i<node_list.length;i++){
        if(node_list[i].id==node_id)
            return true
    }
    return false*/
    return node_id in node_list
}

function initPosition(node){
    node.x = centerX
    node.y = centerY
}

function addNode(nodeID){
    non_isolated_nodes[nodeID] = nodes[nodeID]
    initPosition(nodes[nodeID])
}

function next_edge(){
    if(next_ngbr==-1){
        next_node = 0
        next_ngbr = 0

        //nodes = [{id:next_node, x: nodes_org[next_node]['x'], y: nodes_org[next_node]['y'], label: nodes_org[next_node]['label']}]
        let target = adj_list[next_node][next_ngbr]
        links = [{source:next_node, target:target}]
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
    }
    else if(adj_list[next_node].length>(next_ngbr+1)){
        next_ngbr += 1

        let target = adj_list[next_node][next_ngbr]
        if(target!=undefined){
            links.push({source:next_node, target:target})
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
            links.push({source:next_node, target:target})
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
        }
    }
}