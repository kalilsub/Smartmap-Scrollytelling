<script>
  import Slider from "./ui/slider/slider.svelte"

  export let value

  export let step
  export let label
</script>

<div>
  <div class="my-3 w-full lg:w-80">
    <Slider min={-1} max={1} {step} bind:value />
  </div>
  <span class="mt-0.5 lg:mt-0">
    weight {label}: {value}
  </span>
</div>
