class Graph {
    constructor() {
        this.vertices = {};  // Object to store vertices and their associated edges
    }

    // Add a vertex to the graph
    addVertex(vertex) {
        if (!this.vertices[vertex]) {
        this.vertices[vertex] = [];
        }
    }

    // Add an edge between two vertices
    addEdge(vertex1, vertex2) {
        // Add the edge to the vertex1's adjacency list
        if (this.vertices[vertex1] && this.vertices[vertex2]) {
        this.vertices[vertex1].push(vertex2);
        this.vertices[vertex2].push(vertex1);  // Assuming it's an undirected graph
        } else {
        console.log("One or both vertices do not exist");
        }
    }

    // Remove a vertex and all its edges
    removeVertex(vertex) {
        if (this.vertices[vertex]) {
        // Remove all edges connected to this vertex
        while (this.vertices[vertex].length) {
            const adjacentVertex = this.vertices[vertex].pop();
            this.removeEdge(vertex, adjacentVertex);
        }
        delete this.vertices[vertex];
        }
    }

    // Remove an edge between two vertices
    removeEdge(vertex1, vertex2) {
        this.vertices[vertex1] = this.vertices[vertex1].filter(v => v !== vertex2);
        this.vertices[vertex2] = this.vertices[vertex2].filter(v => v !== vertex1);
    }

    // Display the graph
    displayGraph() {
        for (let vertex in this.vertices) {
        console.log(`${vertex} -> ${this.vertices[vertex].join(", ")}`);
        }
    }
}

class TreeNode {
    constructor(value) {
      this.value = value;  // The value of the node
      this.parent = null;  // The parent node (null for the root)
      this.children = [];  // List of child nodes
    }
  
    // Add a child node to the current node
    addChild(childNode) {
      childNode.parent = this;  // Set this node as the parent of the child
      this.children.push(childNode);  // Add the child to the current node's list of children
    }
  
    // Remove a child node from the current node
    removeChild(childNode) {
      this.children = this.children.filter(child => child !== childNode);
      childNode.parent = null;  // Remove the parent reference from the child
    }
  
    // Display the node and its children (for debugging/printing)
    display() {
      console.log(`${this.value} -> [${this.children.map(child => child.value).join(", ")}]`);
      this.children.forEach(child => child.display());  // Recursively display children
    }
}


  
