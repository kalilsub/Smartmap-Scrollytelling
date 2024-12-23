<script>
  import { onMount } from "svelte"

  //binding
  export let bp = ""

  const xxs = "(max-width: 480px)"
  const xs = "(min-width: 480px)"
  const sm = "(min-width: 640px)"
  const md = "(min-width: 768px)"
  const lg = "(min-width: 1024px)"
  const xl = "(min-width: 1280px)"

  function matches(query) {
    return window.matchMedia(query).matches
  }

  function getScreenSize() {
    if (matches(xl)) return "xl"
    if (matches(lg)) return "lg"
    if (matches(md)) return "md"
    if (matches(sm)) return "sm"
    if (matches(xs)) return "xs"
    if (matches(xxs)) return "2xs"
    return "unknown"
  }

  bp = getScreenSize()

  function updateScreenSize() {
    bp = getScreenSize()
  }

  window.addEventListener("resize", updateScreenSize)

  onMount(() => {
    updateScreenSize()
  })
</script>

<main class="font-space-grotesk">
  <slot />
</main>
