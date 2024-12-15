const graph = {
    "Delhi": { "Agra": 233, "Jaipur": 280, "Lucknow": 497 },
    "Agra": { "Delhi": 233, "Jaipur": 240, "Gwalior": 119 },
    "Jaipur": { "Delhi": 280, "Agra": 240, "Udaipur": 391 },
    "Lucknow": { "Delhi": 497, "Kanpur": 83, "Allahabad": 205 },
    "Kanpur": { "Lucknow": 83, "Allahabad": 204 },
    "Allahabad": { "Lucknow": 205, "Kanpur": 204, "Varanasi": 120 },
    "Varanasi": { "Allahabad": 120, "Patna": 236 },
    "Patna": { "Varanasi": 236, "Kolkata": 420 },
    "Kolkata": { "Patna": 420, "Bhubaneswar": 440 },
    "Bhubaneswar": { "Kolkata": 440, "Visakhapatnam": 660 },
    "Visakhapatnam": { "Bhubaneswar": 660, "Chennai": 660 },
    "Chennai": { "Visakhapatnam": 660, "Bangalore": 350 },
    "Bangalore": { "Chennai": 350, "Hyderabad": 660 },
    "Hyderabad": { "Bangalore": 660, "Mumbai": 700 },
    "Mumbai": { "Hyderabad": 700, "Pune": 150 },
    "Pune": { "Mumbai": 150, "Goa": 430 },
    "Goa": { "Pune": 430, "Bangalore": 550 }
};

// Dijkstra's algorithm to find the shortest path
function dijkstra(start, end) {
    const distances = {};
    const previous = {};
    const nodes = new Set(Object.keys(graph));

    // Initialize distances and previous nodes
    for (let node of nodes) {
        distances[node] = Infinity;
        previous[node] = null;
    }
    distances[start] = 0;

    while (nodes.size > 0) {
        let closestNode = getClosestNode(distances, nodes);
        nodes.delete(closestNode);

        if (closestNode === end) break;

        for (let neighbor in graph[closestNode]) {
            let newDist = distances[closestNode] + graph[closestNode][neighbor];
            if (newDist < distances[neighbor]) {
                distances[neighbor] = newDist;
                previous[neighbor] = closestNode;
            }
        }
    }

    return { distances, previous };
}

// Helper function to find the closest unvisited node
function getClosestNode(distances, nodes) {
    let minDist = Infinity;
    let closestNode = null;
    for (let node of nodes) {
        if (distances[node] < minDist) {
            minDist = distances[node];
            closestNode = node;
        }
    }
    return closestNode;
}

// Function to get the path from source to destination
function getPath(previous, start, end) {
    let path = [];
    let currentNode = end;
    while (currentNode !== start) {
        path.unshift(currentNode);
        currentNode = previous[currentNode];
    }
    path.unshift(start);
    return path;
}

// Function triggered when the user clicks the "Find Shortest Path" button
function findShortestPath() {
    const source = document.getElementById("source").value.trim();
    const destination = document.getElementById("destination").value.trim();

    if (!graph[source] || !graph[destination]) {
        alert("Invalid city names.");
        return;
    }

    const { distances, previous } = dijkstra(source, destination);
    const path = getPath(previous, source, destination);
    
    // Display results
    document.getElementById("path").innerText = path.join(" -> ");
    document.getElementById("distance").innerText = distances[destination] + " km";
}
