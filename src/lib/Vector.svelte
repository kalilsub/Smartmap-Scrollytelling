<script>
  import { fly, fade, scale } from "svelte/transition"
  import Katex from "./Katex.svelte"

  export let store = { answers: [{ value: 0 }, { value: 0 }, { value: 0 }] }

  let drawBorder = false

  function myFly(node, params) {
    if (params.index === 0) {
      return
    }
    if (params.index === 1) {
      return fly(node, { y: 100, ...params })
    }
    if (params.index === 2) {
      return fly(node, { y: 200, ...params })
    }
  }
</script>

<div
  class="flex flex-col h-[400px] xs:h-[500px] mx-auto px-2 justify-around relative vector-border {drawBorder &&
    'vector-border-color'}"
>
  {#each store.answers as answer, i}
    <div class="flex-1 flex items-center">
      {#key answer.value}
        <div
          in:myFly|global={{ index: i, duration: 1000, delay: 1400, opacity: 1 }}
          class="flex
          {i === store.answers.length - 1 && 'xs:-translate-y-[200px] -translate-y-[100px]'} 
          {i === store.answers.length - 2 && 'xs:-translate-y-[100px] -translate-y-[50px]'}"
        >
          <span in:fade|global={{ delay: 2000 }} out:fade|global class="">
            <Katex expression={`x_{${i + 1}}`} />
          </span>
          <span
            class="text-gray-50 w-9 h-9 flex justify-center items-center rounded-2xl bg-stone-700 text-center ml-3"
          >
            {answer.value}
          </span>
        </div>
      {/key}
    </div>
  {/each}

  <div
    in:fade|global={{ delay: 2000 }}
    out:fade|global
    on:introend={() => (drawBorder = true)}
    class="absolute bottom-12"
  >
    <div class="flex absolute left-7 font-bold text-3xl flex-col xs:bottom-20 bottom-16">
      <p class="h-4 xs:h-10">.</p>
      <p class="h-4 xs:h-10">.</p>
      <p class="h-4 xs:h-10">.</p>
    </div>

    <div class="flex">
      <span>
        <Katex expression={"x_{75}"} />
      </span>
      <span
        class="text-gray-50 w-9 h-9 flex justify-center items-center rounded-2xl bg-stone-700 ml-1"
      >
        0
      </span>
    </div>
  </div>
</div>

<style>
  .translate-100 {
    transform: translateY(-100px);
  }

  .translate-200 {
    transform: translateY(-200px);
  }

  .vector-border {
    transition: border-color 400ms;
    transition-delay: 400ms;
    border: 2px solid transparent;
    position: relative;
  }

  .vector-border-color {
    border-color: #44403c;
  }

  .vector-border::before,
  .vector-border::after {
    content: "";
    position: absolute;
    left: 50%;
    width: 65%; /* Width of the white part */
    height: 3px; /* Same as border width */
    background-color: #e7e5e4;
    transform: translateX(-50%); /* Center the pseudo-element */
  }

  .vector-border::before {
    top: -2px; /* Align with the top border */
  }

  .vector-border::after {
    bottom: -2px; /* Align with the bottom border */
  }
</style>
