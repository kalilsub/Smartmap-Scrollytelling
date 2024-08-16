<script>
  export let candidate1
  export let candidate2
  export let distance

  import Vector from "./Vector.svelte"
  import { fade, fly } from "svelte/transition"
</script>

<div class="absolute flex flex-col items-center gap-8 mt-7">
  <div in:fly={{ x: -100, duration: 1000, delay: 300 }} out:fade={{ duration: 200 }}>
    <Vector layout="horizontal" candidate={candidate1} />
  </div>

  <div in:fly={{ x: 100, duration: 1000, delay: 300 }} out:fade={{ duration: 200 }}>
    <Vector layout="horizontal" candidate={candidate2} />
  </div>

  <span in:fly={{ y: 100, duration: 1000 }} out:fade={{ duration: 200 }}
    >|C{candidate1} - C{candidate2}| = {distance}</span
  >
</div>
