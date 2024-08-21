export function processData(data) {
  data.forEach(function (d) {
    ;(d.x = +d.x),
      (d.y = +d.y),
      (d.index = +d.index),
      (d.party_id = +d.party_id),
      (d.index = +d.index),
      (d.candidate_id = +d.candidate_id)
  })

  return data
}

export function getDistances(candidates) {
  const distances = []

  for (let i = 0; i < candidates.length; i++) {
    for (let j = i + 1; j < candidates.length; j++) {
      const distance = calculateEuclideanDistance(candidates[i].answers, candidates[j].answers)
      distances.push({ pair: [i + 1, j + 1], distance })
    }
  }

  return distances
}

// Calculate the Euclidean distance between two vectors
function calculateEuclideanDistance(answers1, answers2) {
  if (answers1.length !== answers2.length) {
    throw new Error("Vectors must be of the same length")
  }

  let sum = 0
  for (let i = 0; i < answers1.length; i++) {
    sum += Math.pow(answers1[i].value - answers2[i].value, 2)
  }

  return Math.sqrt(sum)
}

// Gradient descent to adjust points
export function adjustPoints(points, normalisedDistances, learningRate = 0.01, iterations = 1000) {
  for (let i = 0; i < iterations; i++) {
    const gradients = points.map((point, index) => {
      const original = { ...point }
      point.x += 0.01
      const fx1 = objectiveFunction(points, normalisedDistances)
      point.x -= 0.02
      const fx2 = objectiveFunction(points, normalisedDistances)
      point.x = original.x

      point.y += 0.01
      const fy1 = objectiveFunction(points, normalisedDistances)
      point.y -= 0.02
      const fy2 = objectiveFunction(points, normalisedDistances)
      point.y = original.y

      return {
        x: (fx1 - fx2) / 0.02,
        y: (fy1 - fy2) / 0.02,
      }
    })

    points = points.map((point, index) => {
      let newX = point.x - learningRate * gradients[index].x
      let newY = point.y - learningRate * gradients[index].y

      // Clamp the coordinates to be within the range [0, 10]
      newX = Math.max(1, Math.min(10, newX))
      newY = Math.max(1, Math.min(10, newY))

      return {
        x: newX,
        y: newY,
      }
    })
  }
  return points
}

// Objective function to minimize
function objectiveFunction(points, data) {
  const [p1, p2, p3] = points
  const distances = [
    calculateDistance(p1, p2),
    calculateDistance(p1, p3),
    calculateDistance(p2, p3),
  ]
  return distances.reduce((sum, dist, i) => sum + Math.pow(+dist - data[i], 2), 0)
}

// Calculate the distance between two coordinates
export function calculateDistance(pointA, pointB) {
  return Math.sqrt(Math.pow(pointB.x - pointA.x, 2) + Math.pow(pointB.y - pointA.y, 2)).toFixed(2)
}
