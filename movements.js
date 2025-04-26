
// Get the button and SVG elements
const zoomButton = document.getElementById("centralizeButton");
const moveButton = document.getElementById("moveButton");
const compressButton = document.getElementById("compressButton");
const unmergeButton = document.getElementById("unmergeButton");
const line = document.querySelector("line");
const circle = document.querySelector("circle");

var comDuration = 500

// Function to animate the movement of the line
function animateLineMovement(line, newX1, newY1, newX2, newY2) {
    //const duration = 1000; // Animation duration in milliseconds
    //const duration = 5000;
    const duration = comDuration;
    const startTime = performance.now();

    // Current positions of the line
    const startX1 = parseFloat(line.getAttribute('x1'));
    const startY1 = parseFloat(line.getAttribute('y1'));
    const startX2 = parseFloat(line.getAttribute('x2'));
    const startY2 = parseFloat(line.getAttribute('y2'));

    // Function to update the line position during the animation
    function animate(time) {
        const elapsedTime = time - startTime;
        const progress = Math.min(elapsedTime / duration, 1); // Calculate progress as a value between 0 and 1

        // Interpolate the values for x1, y1, x2, y2
        const currentX1 = startX1 + (newX1 - startX1) * progress;
        const currentY1 = startY1 + (newY1 - startY1) * progress;
        const currentX2 = startX2 + (newX2 - startX2) * progress;
        const currentY2 = startY2 + (newY2 - startY2) * progress;

        // Update the line's coordinates
        line.setAttribute('x1', currentX1);
        line.setAttribute('y1', currentY1);
        line.setAttribute('x2', currentX2);
        line.setAttribute('y2', currentY2);

        // Continue the animation if not yet finished
        if (progress < 1) {
            requestAnimationFrame(animate); // Request the next frame for smooth transition
        }
    }

    // Start the animation
    requestAnimationFrame(animate);
}

// Function to animate the circle movement (for completeness)
function animateCircleMovement(circle, circleNewX, circleNewY) {
    //const circleDuration = 1000;
    const circleDuration = comDuration;
    //console.log(circle)
    const circleStartX = parseFloat(circle.getAttribute('cx'));
    const circleStartY = parseFloat(circle.getAttribute('cy'));
    //const circleNewX = 150;
    //const circleNewY = 150;

    const circleStartTime = performance.now();

    function animateCircle(time) {
        const circleElapsedTime = time - circleStartTime;
        const progress = Math.min(circleElapsedTime / circleDuration, 1);

        const currentX = circleStartX + (circleNewX - circleStartX) * progress;
        const currentY = circleStartY + (circleNewY - circleStartY) * progress;

        circle.setAttribute('cx', currentX);
        circle.setAttribute('cy', currentY);

        if (progress < 1) {
            requestAnimationFrame(animateCircle);
        }
    }

    requestAnimationFrame(animateCircle);
}



function getData(x, y){

    var lineElements = svg.selectAll('line')
    //console.log('lineElements', lineElements, lineElements.nodes(), lineElements.nodes()[11])
    //var specificLine1 = lineElements.nodes()[11]
    var lines = []
    for(var i=2;i<=5;i++){
        lines.push(lineElements.nodes()[i])
    }
    for(var i=7;i<=11;i++){
        lines.push(lineElements.nodes()[i])
    }
    //var data1 = d3.select(specificLine1).datum();

    var specificLine2 = lineElements.nodes()[6]
    var data2 = d3.select(specificLine2).datum();

    var circleElements = svg.selectAll('circle')

    var specificCircle1 = circleElements.nodes()[data2.source.id]
    /*var sourceData = d3.select(specificCircle1).datum();
    sourceData.x = x[sourceData.id]
    sourceData.y = y[sourceData.id]*/
    var sourceDataList = []
    for(var i=0;i<lines.length;i++){
        let sourceData = d3.select(specificCircle1).datum();
        sourceData.x = x[sourceData.id]
        sourceData.y = y[sourceData.id]
        sourceDataList.push(sourceData)
    }

    var specificCircle2 = circleElements.nodes()[data2.target.id]
    /*var targetData = d3.select(specificCircle2).datum();
    targetData.x = x[targetData.id]
    targetData.y = y[targetData.id]*/
    var targetDataList = []
    for(var i=0;i<lines.length;i++){
        let targetData = d3.select(specificCircle2).datum();
        targetData.x = x[targetData.id]
        targetData.y = y[targetData.id]
        targetDataList.push(targetData)
    }

    var oldDataList = []
    for(var i=0;i<lines.length;i++){
        let lineData = d3.select(lines[i]).datum();
        let curCircle = circleElements.nodes()[lineData.target.id]

        let targetData = d3.select(curCircle).datum();
        let tempObj = {x:0, y:0}
        tempObj.x = x[targetData.id]
        tempObj.y = y[targetData.id]
        oldDataList.push(tempObj)
    }
    console.log('oldDataList', oldDataList)

    //var specificCircle3 = circleElements.nodes()[12]
    var circles = []
    for(var i=3;i<=6;i++){
        circles.push(circleElements.nodes()[i])
    }
    for(var i=8;i<=12;i++){
        circles.push(circleElements.nodes()[i])
    }

    //return {specificLine1, specificCircle3, sourceData, targetData}
    return {lines, circles, sourceDataList, targetDataList, oldDataList}
}

function rotatePoint(ox, oy, px, py, t) {
    // Convert angle t to radians
    const radians = t * (Math.PI / 180);
    
    // Translate the point to the origin (ox, oy)
    const translatedX = px - ox;
    const translatedY = py - oy;
    
    // Perform the rotation
    const rotatedX = translatedX * Math.cos(radians) + translatedY * Math.sin(radians);
    const rotatedY = -translatedX * Math.sin(radians) + translatedY * Math.cos(radians);
    
    // Translate back to the original position
    const finalX = rotatedX + ox;
    const finalY = rotatedY + oy;
    
    return { x: finalX, y: finalY };
  }
  



function getDataCompress(x, y){

    var lineElements = svg.selectAll('line')
    //console.log('lineElements', lineElements, lineElements.nodes(), lineElements.nodes()[11])
    //var specificLine1 = lineElements.nodes()[11]
    var lines = []
    for(var i=12;i<=21;i++){
        lines.push(lineElements.nodes()[i])
    }
    //var data1 = d3.select(specificLine1).datum();

    var circleElements = svg.selectAll('circle')

    //var specificCircle3 = circleElements.nodes()[12]
    var circles = []
    for(var i=13;i<=22;i++){
        circles.push(circleElements.nodes()[i])
    }

    //console.log(x[sourceID], y[sourceID], x[targetID], y[targetID], rotatePoint(x[sourceID], y[sourceID], x[targetID], y[targetID], -80))

    
    var sourceDataList = []
    var targetDataList = []
    var angle = 80
    var prevRotate = {x:0, y:0}
    var prevTarget = {x:0, y:0}
    for(var i=0;i<lines.length;i++){

        if(i%2==0){
            angle = -80
        }else{
            angle = 80
        }

        var sourceID = -1
        if(i==0){
            sourceID = d3.select(lines[i]).datum().source.id
        }else{
            sourceID = d3.select(lines[i-1]).datum().target.id
        }
        var targetID = d3.select(lines[i]).datum().target.id

        let sourceData = {x:0, y:0};
        sourceData.x = x[sourceID] - (prevTarget.x - prevRotate.x)
        sourceData.y = y[sourceID] - (prevTarget.y - prevRotate.y)
        sourceDataList.push(sourceData)

        let targetData = {x:0, y:0};
        let afterRotate = rotatePoint(x[sourceID], y[sourceID], x[targetID], y[targetID], angle)
        targetData.x = afterRotate.x - (prevTarget.x - prevRotate.x)
        targetData.y = afterRotate.y - (prevTarget.y - prevRotate.y)
        targetDataList.push(targetData)

        prevRotate.x += afterRotate.x
        prevRotate.y += afterRotate.y
        prevTarget.x += x[targetID]
        prevTarget.y += y[targetID]
    }

    //return {specificLine1, specificCircle3, sourceData, targetData}
    return {lines, circles, sourceDataList, targetDataList}
}



function getDataUnmerge(x, y, obj){

    var lineElements = svg.selectAll('line')
    //console.log('lineElements', lineElements, lineElements.nodes(), lineElements.nodes()[11])
    //var specificLine1 = lineElements.nodes()[11]
    var lines = []
    for(var i=2;i<=5;i++){
        lines.push(lineElements.nodes()[i])
    }
    for(var i=7;i<=11;i++){
        lines.push(lineElements.nodes()[i])
    }
    //var data1 = d3.select(specificLine1).datum();

    var specificLine2 = lineElements.nodes()[6]
    var data2 = d3.select(specificLine2).datum();

    var circleElements = svg.selectAll('circle')

    var specificCircle1 = circleElements.nodes()[data2.source.id]
    /*var sourceData = d3.select(specificCircle1).datum();
    sourceData.x = x[sourceData.id]
    sourceData.y = y[sourceData.id]*/
    var sourceDataList = []
    for(var i=0;i<lines.length;i++){
        let sourceData = d3.select(specificCircle1).datum();
        sourceData.x = x[sourceData.id]
        sourceData.y = y[sourceData.id]
        sourceDataList.push(sourceData)
    }

    //console.log('obj.oldDataList', obj.oldDataList)
    var specificCircle2 = circleElements.nodes()[data2.target.id]
    /*var targetData = d3.select(specificCircle2).datum();
    targetData.x = x[targetData.id]
    targetData.y = y[targetData.id]*/
    var targetDataList = []
    for(var i=0;i<lines.length;i++){
        let targetData = d3.select(specificCircle2).datum();
        //console.log(x[targetData.id], obj.oldDataList[i].x)
        let tempObj = {x:0, y:0}
        tempObj.x = x[targetData.id] + (x[targetData.id]-obj.oldDataList[i].x)*.5
        tempObj.y = y[targetData.id]
        targetDataList.push(tempObj)
    }
    //console.log('targetDataList', targetDataList)

    //var specificCircle3 = circleElements.nodes()[12]
    var circles = []
    for(var i=3;i<=6;i++){
        circles.push(circleElements.nodes()[i])
    }
    for(var i=8;i<=12;i++){
        circles.push(circleElements.nodes()[i])
    }

    //return {specificLine1, specificCircle3, sourceData, targetData}
    return {lines, circles, sourceDataList, targetDataList}
}

var oldCoordinates = null;
var firstReturnObject = null;

// Add click event listener to the button
moveButton.addEventListener("click", () => {

    var coordinates = centralize()
    var x = coordinates.x, y = coordinates.y
    var returnObj = getData(x, y)
    //console.log(returnObj)

    // Move the line to new position (e.g., new coordinates for x1, y1, x2, y2)
    /*animateLineMovement(returnObj.specificLine1, returnObj.sourceData.x, returnObj.sourceData.y, returnObj.targetData.x, returnObj.targetData.y); // Move line to new position
    animateCircleMovement(returnObj.specificCircle3, returnObj.targetData.x, returnObj.targetData.y)*/
    for(var i=0;i<returnObj.lines.length;i++){
        animateLineMovement(returnObj.lines[i], returnObj.sourceDataList[i].x, returnObj.sourceDataList[i].y, returnObj.targetDataList[i].x, returnObj.targetDataList[i].y); // Move line to new position
        animateCircleMovement(returnObj.circles[i], returnObj.targetDataList[i].x, returnObj.targetDataList[i].y)
    }

    // set the oldCoordinates equal to cooridnates for the other action
    oldCoordinates = coordinates
    firstReturnObject = returnObj

    // Move the circle to a new position
    //animateCircleMovement();
});



// Add click event listener to the button
compressButton.addEventListener("click", () => {

    var x = oldCoordinates.x, y = oldCoordinates.y
    var returnObj = getDataCompress(x, y)

    for(var i=0;i<returnObj.lines.length;i++){
        animateLineMovement(returnObj.lines[i], returnObj.sourceDataList[i].x, returnObj.sourceDataList[i].y, returnObj.targetDataList[i].x, returnObj.targetDataList[i].y); // Move line to new position
        animateCircleMovement(returnObj.circles[i], returnObj.targetDataList[i].x, returnObj.targetDataList[i].y)
    }

    // Move the circle to a new position
    //animateCircleMovement();
});



// Add click event listener to the button
unmergeButton.addEventListener("click", () => {

    var x = oldCoordinates.x, y = oldCoordinates.y
    var returnObj = getDataUnmerge(x, y, firstReturnObject)

    for(var i=0;i<returnObj.lines.length;i++){
        animateLineMovement(returnObj.lines[i], returnObj.sourceDataList[i].x, returnObj.sourceDataList[i].y, returnObj.targetDataList[i].x, returnObj.targetDataList[i].y); // Move line to new position
        animateCircleMovement(returnObj.circles[i], returnObj.targetDataList[i].x, returnObj.targetDataList[i].y)
    }

    // Move the circle to a new position
    //animateCircleMovement();
});


zoomButton.addEventListener("click", () => {
    centralize()
});