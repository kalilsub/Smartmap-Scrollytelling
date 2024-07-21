<script>
  import { fade } from "svelte/transition"

  export let number
  export let selectedAnswer
</script>

<div in:fade={{ delay: 2000 }} class="absolute transition-opacity delay-1000">
  <span class="right-8 relative top-12">Q{number}</span>

  <span class="w-20 h-20 flex justify-center items-center bg-red-500">
    {selectedAnswer}
  </span>
</div>
