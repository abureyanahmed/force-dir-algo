(async () => {
    const d3 = await import('d3');
  
    // Your D3 code here
    const { JSDOM } = require('jsdom');
    const fs = require('fs');

    console.log('Usage: node force_directed_stress.js input_file output_file')

    // Path to the JSON file
    //const filePath = './data.json';
    //console.log(process.argv)
    const filePath = process.argv[2]

    try {
        // Read the JSON file synchronously
        const data = fs.readFileSync(filePath, 'utf8');
        
        // Parse the JSON data into a JavaScript object
        var jsonData = JSON.parse(data);

        //console.log(jsonData);
    } catch (err) {
        console.error('Error reading the file:', err);
    }
  
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    const { document } = dom.window;
  
    const svg = d3.select(document.body).append('svg')
      .attr('width', 650)
      .attr('height', 650);

    var node_ids = jsonData["node_ids"]
    var cx_arr = []
    var cy_arr = []
    var r_arr = []
    for(var i=0;i<node_ids.length;i++){
        cx_arr.push(Math.random()*10)
        cy_arr.push(Math.random()*10)
        r_arr.push(2)
    }
    const nodes = d3.range(node_ids.length).map(
        //(d) => {return {id:d, x:Math.random()*500+20, y:Math.random()*500+20, r:Math.random()*200}}
        (i) => {return {id:i, x:cx_arr[i], y:cy_arr[i], r:r_arr[i]}}
        
    )
    //const edge_source = [0, 1, 2]
    //const edge_target = [1, 2, 3]
    var edge_source = jsonData["edge_source"]
    var edge_target = jsonData["edge_target"]
    var edges = []
    for(var i=0;i<edge_source.length;i++){
        var obj = {
            'id': i,
            'source':nodes[edge_source[i]], 
            'target':nodes[edge_target[i]]
        }
        edges.push(obj)
    }
    //console.log(edges)
    var d = jsonData["d"]
    //console.log(d)

    var g = svg.append("g");

    g.selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    //.attr("r", "5")
    .attr("r", d => d.r)
    .style("fill", "red")
    
    g.selectAll("line")
    .data(edges)
    .enter()
    .append("line")
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y)
    //.attr("r", "5")
    .attr("stroke", 'red')
    .style("stroke-width", "2px")

    function find_distance(nodes, i, j){
        return Math.sqrt((nodes[i].x-nodes[j].x)*(nodes[i].x-nodes[j].x) + (nodes[i].y-nodes[j].y)*(nodes[i].y-nodes[j].y))
    }

    var logContent = ''

    function forceStress(){
        return function(){
            //write the stress code here
            for(var i=0;i<nodes.length;i++)
            {
                var forceX = 0.0
                var forceY = 0.0
                for(var j=0;j<nodes.length;j++)
                {
                    if(i!=j)
                    {
                        var dij = d[i][j]*200
                        var wij = 1/(dij*dij)
                        var xij = find_distance(nodes,i,j)
                        forceX += -2*wij*(xij-dij)*(nodes[i].x-nodes[j].x)/xij
                        forceY += -2*wij*(xij-dij)*(nodes[i].y-nodes[j].y)/xij
                        //console.log(i,j,xij,dij,forceX, forceY)
                        logContent += `${i},${j},${xij},${dij},${forceX},${forceY}\n`
                    }
                }
                nodes[i].vx = forceX*10000
                nodes[i].vy = forceY*10000
            }
        }
    }

    var width = parseInt(svg.attr("width"))
    var height = parseInt(svg.attr("height"))
    const simulation = d3.forceSimulation(nodes)
    .force("links", d3.forceLink(edges).strength(0))
    //.force("center", d3.forceCenter(width / 2, height / 2))
    //.force("abc", d3.forceCollide(d => d.r))
    //.force("test", testForce())
    //.force("charge", d3.forceManyBody())
    .force("stress", forceStress())

    simulation.stop()
    //for(var i=0;i<100;i++)
    for(var i=0;i<40;i++)
    {
        simulation.alpha(1.0)
        simulation.tick()
    }

    
    const logPath = 'log.csv'

    try {
        fs.writeFileSync(logPath, logContent);
        console.log(`Log file (${logPath}) has been saved!`);
    } catch (err) {
        console.error(err);
    }

    var circles = document.getElementsByTagName("circle")
    let x = []
    let y = []
    for(var i=0;i<circles.length;i++){
        x.push(circles[i].__data__.x)
        y.push(circles[i].__data__.y)
    }
    console.log(x, y)

    var r = []
    for(var i=0;i<x.length;i++){
        r.push(2)
    }
    const content = `
    var cx_arr = [${x}]
    var cy_arr = [${y}]
    var r_arr = [${r}]
    `;

    // Path of the text file
    //const outPath = './output.js';
    const outPath = process.argv[3]

    try {
        // Write data to the file synchronously
        fs.writeFileSync(outPath, content, 'utf8');
        console.log('File has been written successfully!');
    } catch (err) {
        console.error('Error writing to the file:', err);
    }
  
    /*svg.append('circle')
      .attr('cx', 250)
      .attr('cy', 250)
      .attr('r', 100)
      .style('fill', 'blue');
  
    const svgContent = svg.node().outerHTML;
    fs.writeFileSync('output.svg', svgContent);*/
  })();
  