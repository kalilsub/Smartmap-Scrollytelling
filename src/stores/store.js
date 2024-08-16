import { writable } from "svelte/store"
// @ts-ignore
import data from "../data/combined.csv"
import { processData } from "../utils/process"

export const csvData = writable(processData(data))
export const selectedCandidate = writable({
  id: 1910,
  answers: [
    { value: 1, isSelected: false },
    { value: 1, isSelected: false },
    { value: 0.25, isSelected: false },
  ],
})
