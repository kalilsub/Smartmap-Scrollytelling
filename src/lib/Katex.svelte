<script>
  import katex from "katex"
  import "katex/dist/katex.min.css"
  import { onMount } from "svelte"

  export let expression = ""
  export let displayMode = false
  let renderedMath

  onMount(() => {
    renderedMath.innerHTML = katex.renderToString(expression, {
      throwOnError: false,
      displayMode,
    })
  })

  // Reactive statement to re-render math whenever expression or displayMode changes
  $: {
    if (renderedMath) {
      renderedMath.innerHTML = katex.renderToString(expression, {
        throwOnError: false,
        displayMode,
      })
    }
  }
</script>

<div bind:this={renderedMath}></div>

<style>
  div {
    font-size: 1.5em;
  }
</style>
