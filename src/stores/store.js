import { writable, derived } from "svelte/store"
import { tweened } from "svelte/motion"

// @ts-ignore
import data from "../data/combined.csv"
import { data as initialCoordinates } from "../data/candidateCoordinates"
import { processData, getDistances, calculateDistance } from "../utils/helpers"

export const csvData = writable(processData(data))
export const selectedCandidates = writable([
  {
    id: 1910,
    answers: [
      { value: 1, isSelected: false },
      { value: 1, isSelected: false },
      { value: 0.25, isSelected: false },
    ],
  },
  {
    id: 2,
    answers: [
      { value: 0.5, isSelected: false },
      { value: 0.75, isSelected: false },
      { value: 0.25, isSelected: false },
    ],
  },

  {
    id: 3,
    answers: [
      { value: 0, isSelected: false },
      { value: 0.25, isSelected: false },
      { value: 1, isSelected: false },
    ],
  },
])

export const vectorDistances = derived(selectedCandidates, ($selectedCandidates) => {
  return getDistances($selectedCandidates)
})

export const candidatePoints = tweened([...initialCoordinates])

export const candidateDistances = derived(candidatePoints, ($candidatePoints) => {
  const [p1, p2, p3] = $candidatePoints
  return [
    { pair: [p1, p2], distance: +calculateDistance(p1, p2) },
    { pair: [p1, p3], distance: +calculateDistance(p1, p3) },
    { pair: [p2, p3], distance: +calculateDistance(p2, p3) },
  ]
})
