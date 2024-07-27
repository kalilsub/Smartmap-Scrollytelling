<script>
  import { fly, fade } from "svelte/transition"
  import { selectedCandidate, componentUpdates } from "../stores/store"
</script>

<div class="h-[550px] w-20 flex flex-col justify-around border-solid border-red-500 border-2">
  {#each $selectedCandidate.answers as answer, i}
    <div class="flex-1 border-solid border-red-500 border-2 flex items-center">
      {#key answer.value}
        <div
          in:fly={{ x: 100, duration: 1000 }}
          out:fade={{ duration: 200 }}
          class="w-9 rounded-xl bg-slate-500 text-center ml-2 absolute {!$componentUpdates[i] &&
            'hidden'}"
        >
          {answer.value}
        </div>
      {/key}
    </div>
  {/each}
</div>
