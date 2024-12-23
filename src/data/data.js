// @ts-ignore
import combinationsData from "./csv/combinations_filled.csv"
// @ts-ignore
import candidateCoordinates from "./csv/candidates.csv"
// @ts-ignore
import sampleReactions from "./csv/reaction-sample2.csv"
// @ts-ignore
import allReactions from "./csv/reactions.csv"
import { processData, adjustPositions } from "./dataUtils"

// data used in intro
export const questions = [
  {
    id: 32214,
    label: "Do you support an increase in the retirement age (e.g., to 67)?",
  },
  {
    id: 32215,
    label:
      "Should the federal government allocate more funding for health insurance premium subsidies?",
  },
  {
    id: 32268,
    label:
      "Should Switzerland terminate the Schengen agreement with the EU and reintroduce more security checks directly on the border?",
  },
]
export const combinations = processData(combinationsData)
export const allAnswers = processData(allReactions)

// Presets for store data
export const coordinates = processData(candidateCoordinates)
export const allCentered = coordinates.map((candidate, index) => ({
  ...candidate,
  x: 0,
  y: 0,
}))
export const initialCameraPosition = [0, 1, 35]
export const scatterCameraPosition = [-20, 30, 30]

export const initialGrid = {
  gridSize: 20,
  sectionSize: 10,
  sectionThickness: 3,
  cellSize: 2,
  cellThickness: 1,
  positionXY: { x: 0, y: 1, z: 0 },
}

export const initialDomain = {
  x: [-1, 1],
  y: [-1, 1],
  z: [-1, 1],
}
export const scatterDomain = {
  x: [0, 1],
  y: [0, 1],
  z: [0, 1],
}

export const standardisedResidualsDomain = {
  x: [-1, 1],
  y: [-1, 1],
  z: [-3, 3],
}

export const initialAxisDimensions = {
  x1: [1.1, 0, -0.1],
  x2: [-0.1, 0, -0.1],
  y1: [1.1, 0, -0.1],
  y2: [1.1, 1.1, -0.1],
  z1: [1.1, 0, -0.1],
  z2: [1.1, 0, 1.1],
}

export const initialAxisLabels = {
  x: [-0.1, 0, -0.3],
  y: [1.2, 1.2, -0.15],
  z: [1.3, 0, 1.05],
}

export const initialLabelRotation = {
  x: 0,
  y: -Math.PI / 4,
  z: 0,
}

export const initialAxisArrowRotation = {
  x: [Math.PI / 2, 0, Math.PI / 2],
  y: [0, 0, 0],
  z: [0, -Math.PI / 2, -Math.PI / 2],
}

export const initialDeviation = {
  start: [-1, 0, -2],
  end: [-1, 0, 0.5],
  arrowRotationStart: [-Math.PI / 2, 0, 0],
  arrowRotationEnd: [Math.PI / 2, 0, 0],
}

// Correspondence Analysis data
export const answers = processData(sampleReactions)
export const observedFreqs = answers.map((candidate, index) => ({
  id: candidate.id,
  party_short: coordinates[index].party_short_short,
  color: coordinates[index].color,
  x: +candidate.answer_32214,
  y: +candidate.answer_32215,
  z: +candidate.answer_32268,
}))

export const rowTotals = observedFreqs.map((row) => row.x + row.y + row.z)

export const columnTotals = {
  q1: observedFreqs.reduce((sum, row) => sum + row.x, 0),
  q2: observedFreqs.reduce((sum, row) => sum + row.y, 0),
  q3: observedFreqs.reduce((sum, row) => sum + row.z, 0),
  overallTotal: rowTotals.reduce((sum, row) => sum + row, 0),
}

export const expectedFreqs = observedFreqs.map((candidate, i) => ({
  id: candidate.id,
  color: candidate.color,
  x: (rowTotals[i] * columnTotals.q1) / columnTotals.overallTotal,
  y: (rowTotals[i] * columnTotals.q2) / columnTotals.overallTotal,
  z: (rowTotals[i] * columnTotals.q3) / columnTotals.overallTotal,
}))

export const residuals = observedFreqs.map((candidate, i) => ({
  id: candidate.id,
  x: expectedFreqs[i].x - candidate.x,
  y: expectedFreqs[i].y - candidate.y,
  z: expectedFreqs[i].z - candidate.z,
  color: candidate.color,
  party: candidate.party_short,
}))

export const standardisedResiduals = residuals.map((candidate, i) => ({
  id: candidate.id,
  x: candidate.x / Math.sqrt(expectedFreqs[i].x),
  y: candidate.y / Math.sqrt(expectedFreqs[i].y),
  z: candidate.z / Math.sqrt(expectedFreqs[i].z),
  color: candidate.color,
  party: candidate.party_short,
}))

export const observedFreqsAdjusted = adjustPositions(observedFreqs, 0.085)
export const expectedFreqsAdjusted = adjustPositions(expectedFreqs, 0.09)
export const residualsAdjusted = adjustPositions(residuals, 0.09)
export const standardisedResidualsAdjusted = adjustPositions(standardisedResiduals, 0.25)
