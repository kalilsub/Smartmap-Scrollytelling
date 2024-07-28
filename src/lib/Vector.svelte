<script>
  import { fly, fade } from "svelte/transition"
  import { componentUpdates } from "../stores/store"

  export let store = { answers: [{ value: 0 }, { value: 0 }, { value: 0 }] }
  export let secondStep = false
  export let hide = false
  export let gap = false

  let finished = false

  function handleTransitionEnd(index) {
    if (index === 2) {
      console.log("finished")
      finished = !finished
    }
  }
</script>

<div class="h-[550px] w-20 flex flex-col justify-around relative {gap && 'ml-20'}">
  {#if !hide}
    {#each store.answers as answer, i}
      <div class="flex-1 flex items-center">
        {#key answer.value}
          <div
            in:fly={{ x: 100, duration: 1000 }}
            out:fade={{ duration: 200 }}
            class="w-9 h-9 flex justify-center items-center rounded-2xl bg-slate-500 text-center ml-2 absolute transition-all duration-1000 delay-[1500ms] {!$componentUpdates[
              i
            ] && 'hidden'}"
            class:slide-up-1={secondStep && i === 1}
            class:slide-up-2={secondStep && i === 2}
            class:slide-down={!secondStep && i > 0}
            on:transitionend={() => handleTransitionEnd(i)}
          >
            {#if secondStep}
              <span in:fade={{ delay: 1500 }} out:fade class="absolute right-12">Q.{i + 1}</span>
            {/if}

            {answer.value}
          </div>
        {/key}
      </div>
    {/each}
  {/if}

  {#if finished}
    <div in:fade={{ delay: 200 }} out:fade class="absolute bottom-0">
      <div class="absolute left-7 bottom-0">
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
      </div>
      <span class="absolute right-2 bottom-0">Q.75</span>
    </div>
  {/if}
</div>

<style>
  .slide-up-1 {
    transform: translateY(-100px);
  }
  .slide-up-2 {
    transform: translateY(-200px);
  }

  .slide-down {
    transform: translateY(0);
    transition-delay: 0ms;
  }
</style>
