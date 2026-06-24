export function dijkstra(graph, start, end) {
  // Validate inputs
  if (!graph || !(start in graph) || !(end in graph)) {
    return {
      path: [],
      cost: Infinity,
    };
  }

  const distances = {};
  const previous = {};
  const visited = new Set();

  // Initialize
  for (let node in graph) {
    distances[node] = Infinity;
    previous[node] = null;
  }

  distances[start] = 0;

  while (true) {
    let closestNode = null;

    for (let node in distances) {
      if (!visited.has(node)) {
        if (
          closestNode === null ||
          distances[node] < distances[closestNode]
        ) {
          closestNode = node;
        }
      }
    }

    if (closestNode === null || distances[closestNode] === Infinity) break;

    visited.add(closestNode);

    const neighbors = graph[closestNode] || [];
    for (let neighbor of neighbors) {
      const newDist = distances[closestNode] + neighbor.weight;

      if (distances[neighbor.node] !== undefined && newDist < distances[neighbor.node]) {
        distances[neighbor.node] = newDist;
        previous[neighbor.node] = closestNode;
      }
    }
  }

  // Build path
  const path = [];
  let current = end;

  while (current) {
    path.unshift(current);
    current = previous[current];
  }

  return {
    path,
    cost: distances[end],
  };
}