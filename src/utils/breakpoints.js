const xs = "(min-width: 480px)"
const sm = "(min-width: 640px)"
const md = "(min-width: 768px)"
const lg = "(min-width: 1024px)"
const xl = "(min-width: 1280px)"

function matches(query) {
  return window.matchMedia(query).matches
}

let currentScreenSize = getScreenSize()

function getScreenSize() {
  if (matches(xl)) return "xl"
  if (matches(lg)) return "lg"
  if (matches(md)) return "md"
  if (matches(sm)) return "sm"
  if (matches(xs)) return "xs"
  return "unknown"
}

function updateScreenSize() {
  currentScreenSize = getScreenSize()
}

window.addEventListener("resize", updateScreenSize)

export function getCurrentScreenSize() {
  return currentScreenSize
}
