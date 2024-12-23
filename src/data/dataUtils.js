export function processData(data) {
  data.forEach(function (d) {
    if (d.x) {
      d.x = +d.x
    }
    if (d.y) {
      d.y = +d.y
    }
    if (d.z) {
      d.z = +d.z
    }
    if (d.id) {
      d.id = +d.id
    }
  })

  return data
}

function findDuplicates(data) {
  const map = new Map()
  const duplicates = []

  data.forEach((item) => {
    const key = `${item.x}-${item.y}-${item.z}`
    if (map.has(key)) {
      duplicates.push(item)
    } else {
      map.set(key, item)
    }
  })

  return duplicates
}

// Function to generate random offset within a radius
function getRandomOffset(radius) {
  const u = Math.random()
  const v = Math.random()
  const theta = 2 * Math.PI * u
  const phi = Math.acos(2 * v - 1)
  const r = radius * Math.cbrt(Math.random()) // Cube root to ensure uniform distribution within the sphere

  return {
    x: r * Math.sin(phi) * Math.cos(theta),
    y: r * Math.sin(phi) * Math.sin(theta),
    z: r * Math.cos(phi),
  }
}

// Function to adjust positions of duplicates
export function adjustPositions(data, radius = 0.02) {
  const collisionPoints = findDuplicates(data)
  const adjustedCollisionPoints = collisionPoints.map((point) => {
    const offset = getRandomOffset(radius)
    return {
      ...point,
      x: point.x + offset.x,
      y: point.y + offset.y,
      z: point.z + offset.z,
    }
  })

  const adjustedData = data.map((point) => {
    const match = adjustedCollisionPoints.find((collisionPoint) => collisionPoint.id === point.id)
    if (match) {
      return { ...point, x: match.x, y: match.y, z: match.z }
    } else {
      return point
    }
  })

  return adjustedData
}
