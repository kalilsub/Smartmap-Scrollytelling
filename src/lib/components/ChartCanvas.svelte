<script>
  import { Canvas } from "@threlte/core"
  import Legend from "./viz/Legend.svelte"
  import { onDestroy, onMount } from "svelte"

  export let bp
  export let step

  let width, height

  $: if (step) {
    setCanvasSize()
    // console.log(width, height)
  }

  function setHeight() {
    if (step > 14 && step < 19) {
      height = (window.innerHeight - 80) / 2
    } else if (bp === "xl") {
      height = window.innerHeight
    } else if (bp === "lg") {
      height = window.innerHeight * 0.8
    } else if (bp === "2xs") {
      height = window.innerHeight * 0.7
    } else {
      height = window.innerHeight * 0.8
    }
  }

  // $: console.log(width, height)

  function setCanvasSize() {
    width = bp === "lg" || bp === "xl" ? window.innerWidth / 2 : window.innerWidth - 10

    setHeight()
  }

  // window.addEventListener("resize", setCanvasSize)

  onMount(() => {
    window.addEventListener("resize", setCanvasSize)

    setCanvasSize()
    return () => {
      window.removeEventListener("resize", setCanvasSize)
    }
  })
</script>

<!-- style={step < 9 ? canvasHeight : "height: 350px;"} -->

<Canvas size={{ width, height }}>
  <slot />
</Canvas>
<!-- <div>

</div> -->
<!-- {#if step < 8}
  <Legend />
{/if} -->
