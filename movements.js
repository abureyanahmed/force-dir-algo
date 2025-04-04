
// Get the button and SVG elements
const moveButton = document.getElementById("moveButton");
const line = document.querySelector("line");
const circle = document.querySelector("circle");

// Function to animate the movement of the line
function animateLineMovement(line, newX1, newY1, newX2, newY2) {
    const duration = 1000; // Animation duration in milliseconds
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
    const circleDuration = 1000;
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



// Add click event listener to the button
moveButton.addEventListener("click", () => {

    // Move the line to new position (e.g., new coordinates for x1, y1, x2, y2)
    animateLineMovement(specificLine1, sourceData.x, sourceData.y, targetData.x, targetData.y); // Move line to new position
    animateCircleMovement(specificCircle3, targetData.x, targetData.y)

    // Move the circle to a new position
    //animateCircleMovement();
});