<script>
  export let candidate1
  export let candidate2

  import Vector from "./Vector.svelte"
  import { selectedCandidates, vectorDistances } from "../stores/store"
  import { fade, fly } from "svelte/transition"

  const distance = $vectorDistances.find(
    (vector) => vector.pair[0] === candidate1 && vector.pair[1] === candidate2,
  ).distance
</script>

<div class="absolute flex flex-col items-center gap-8 mt-7">
  <div in:fly={{ x: -100, duration: 1000, delay: 300 }} out:fade={{ duration: 200 }}>
    <Vector
      store={$selectedCandidates[candidate1 - 1]}
      layout="horizontal"
      candidate={candidate1}
    />
  </div>

  <div in:fly={{ x: 100, duration: 1000, delay: 300 }} out:fade={{ duration: 200 }}>
    <Vector
      store={$selectedCandidates[candidate2 - 1]}
      layout="horizontal"
      candidate={candidate2}
    />
  </div>

  <span in:fly={{ y: 100, duration: 1000 }} out:fade={{ duration: 200 }}
    >|C{candidate1} - C{candidate2}| = {distance.toFixed(2)}</span
  >
</div>
