import { tweened } from "svelte/motion"
import { Vector3 } from "three"

import {
  residuals,
  coordinates,
  initialGrid,
  initialAxisDimensions,
  initialAxisLabels,
  initialDomain,
  initialCameraPosition,
  initialLabelRotation,
  initialAxisArrowRotation,
  initialDeviation,
  standardisedResidualsAdjusted,
} from "../data/data"
import { cubicInOut } from "svelte/easing"

export const smartmapData = tweened(coordinates, { duration: 1000, easing: cubicInOut })
export const projectedData = tweened(
  standardisedResidualsAdjusted.map((point) => ({
    ...point,
    position: new Vector3(point.x, point.y, point.z),
  })),
)

export const newCandidate = tweened(
  {
    id: 0,
    x: 0,
    y: 0,
    answers: [
      { id: 32214, value: -1 },
      { id: 32215, value: -1 },
      { id: 32268, value: -1 },
    ],
  },
  { duration: 1000, easing: cubicInOut },
)

// 3D related stores
export const pc1 = tweened({ x: [1], y: [1], z: [1] })
export const pc2 = tweened({ x: [1], y: [1], z: [1] })

export const cameraPosition = tweened(initialCameraPosition, { duration: 1000, easing: cubicInOut })
export const gridProperties = tweened(initialGrid)
export const domain = tweened(initialDomain)

export const axisDimensions = tweened(initialAxisDimensions)
export const axisLabels = tweened(initialAxisLabels)
export const labelRotation = tweened(initialLabelRotation)
export const axisArrowRotation = tweened(initialAxisArrowRotation)
export const deviation = tweened(initialDeviation)
