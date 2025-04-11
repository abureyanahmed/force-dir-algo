
// Get the button and SVG elements
const zoomButton = document.getElementById("centralizeButton");
const moveButton = document.getElementById("moveButton");
const line = document.querySelector("line");
const circle = document.querySelector("circle");

// Function to animate the movement of the line
function animateLineMovement(line, newX1, newY1, newX2, newY2) {
    //const duration = 1000; // Animation duration in milliseconds
    const duration = 5000;
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
    const circleDuration = 5000;
    console.log(circle)
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

    // Move the circle to a new position
    //animateCircleMovement();
});


zoomButton.addEventListener("click", () => {
    centralize()
});