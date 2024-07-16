<script>
  import { selectedCandidate, csvData } from "../stores/store"
  import { fade, fly } from "svelte/transition"

  export let question
  export let number
  export let secondStep

  const answers = [
    { label: "Yes", value: 1.0 },
    { label: "Rather yes", value: 0.75 },
    { label: "Rather no", value: 0.5 },
    { label: "No", value: 0.25 },
  ]

  $: isSelected = false

  $: selectedAnswer = $selectedCandidate.answers[number - 1]

  function getRandomCoordinate(min, max) {
    return Math.random() * (max - min) + min
  }

  function selectAnswer(value) {
    isSelected = true
    $selectedCandidate.answers[number - 1] = value

    const index = $csvData.findIndex(
      (candidate) => candidate.candidate_id === $selectedCandidate.id,
    )

    // calculate new coordinates for the selected candidate
    if (index !== -1) {
      $csvData[index].x = getRandomCoordinate(-2.5, 2.5)
      $csvData[index].y = getRandomCoordinate(-2.5, 2.5)
    }
  }

  $: if (secondStep) {
    isSelected = false
  }
</script>

<div class="relative flex items-center transition-all">
  <div
    class={`${secondStep ? "w-20 m-0 transitions" : "w-[400px] m-2.5"} max-h-40  bg-stone-800 px-8 py-6 text-zinc-50 delay-100 duration-500`}
  >
    <div
      class={`${secondStep ? "pointer-events-none opacity-0" : "opacity-100 delay-200"} duration-500`}
    >
      <div class=" mb-6 text-lg">
        <span class="position: absolute left-5">{number}.</span>
        {question}
      </div>

      <div class="flex justify-center">
        {#each answers as answer, index}
          <!-- svelte-ignore a11y-click-events-have-key-events -->

          <button
            class="ml-1 min-h-16 w-20 cursor-pointer px-2 py-2
              {selectedAnswer === answer.value ? 'bg-stone-400' : 'bg-stone-700'}
              {index === 0 ? 'rounded-l-xl' : ''}
            {index === answers.length - 1 ? 'rounded-r-xl' : ''}"
            on:click={() => selectAnswer(answer.value)}
          >
            {answer.label}
          </button>
        {/each}
      </div>
    </div>
  </div>

  <div class="h-0 w-9">
    {#if isSelected && !secondStep}
      <div
        in:fly={{ x: 100, duration: 1000 }}
        out:fade={{ delay: 1000, duration: 500 }}
        class="w-9 rounded-xl bg-slate-500 text-center"
      >
        {selectedAnswer}
      </div>
    {/if}
  </div>

  {#if secondStep}
    <div
      in:fade={{ delay: 2000 }}
      class="w-20 h-20 absolute bg-red-500 transition-opacity delay-1000"
    ></div>
  {/if}
</div>

<style>
  .transitions {
    transition:
      width 1000ms 500ms,
      margin 500ms 200ms;
  }
</style>
