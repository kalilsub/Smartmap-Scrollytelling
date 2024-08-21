<script>
  import { fly, fade } from "svelte/transition"

  export let store = { answers: [{ value: 0 }, { value: 0 }, { value: 0 }] }
  export let modified = false
  export let gap = false
  export let layout = "vertical"
  export let candidate = 0
</script>

<div
  class={`h-[550px] w-16 flex flex-col justify-around relative vector-border ${gap && "ml-20"} ${modified && "vector-border-color"} ${layout}`}
>
  {#if layout === "horizontal"}
    <span class="absolute self-center -left-24">Candidate {candidate}</span>
  {/if}

  {#each store.answers as answer, i}
    <div class="flex-1 flex items-center">
      {#key answer.value}
        <div
          in:fly={{ x: 100, duration: 1000 }}
          out:fade={{ duration: 200 }}
          class="w-9 h-9 flex justify-center items-center rounded-2xl bg-slate-500 text-center ml-2 absolute transition-all duration-1000 delay-[1500ms]"
          class:slide-up-1={modified && i === 1}
          class:slide-up-2={modified && i === 2}
          class:slide-down={!modified && i > 0}
        >
          {#if modified}
            <span in:fade={{ delay: 1500 }} out:fade class="absolute right-12">Q.{i + 1}</span>
          {/if}

          {answer.value}
        </div>
      {/key}
    </div>
  {/each}

  {#if modified}
    <div in:fade={{ delay: 2000 }} out:fade class="absolute bottom-0">
      <div class="absolute left-6 bottom-24 font-bold text-3xl">
        <p>.</p>
        <p>.</p>
        <p>.</p>
        <p>.</p>
      </div>

      <div
        class="absolute right-2 bottom-1 w-9 h-9 flex justify-center items-center rounded-2xl bg-slate-500 left-2"
      >
        <span class="absolute right-12">Q.75</span>
        0
      </div>
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

  .horizontal {
    flex-direction: row;
    width: 250px;
    height: 4em;
  }

  .horizontal.vector-border {
    border-color: red;
  }

  .vector-border {
    transition: border-color 400ms;
    transition-delay: 1500ms;
    border: 2px solid transparent;
    position: relative;
  }

  .vector-border-color {
    border-color: red;
  }

  .vector-border::before,
  .vector-border::after {
    content: "";
    position: absolute;
    left: 50%;
    width: 65%; /* Width of the white part */
    height: 3px; /* Same as border width */
    background-color: white;
    transform: translateX(-50%); /* Center the pseudo-element */
  }

  .vector-border::before {
    top: -2px; /* Align with the top border */
  }

  .vector-border::after {
    bottom: -2px; /* Align with the bottom border */
  }
</style>
