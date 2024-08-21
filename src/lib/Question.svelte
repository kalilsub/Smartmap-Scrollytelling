<script>
  import { selectedCandidates, csvData } from "../stores/store"

  export let question
  export let number

  const answers = [
    { label: "Yes", value: 1.0 },
    { label: "Rather yes", value: 0.75 },
    { label: "Rather no", value: 0.5 },
    { label: "No", value: 0.25 },
  ]

  $: selectedAnswer = $selectedCandidates[0].answers[number - 1]

  function getRandomCoordinate(min, max) {
    return Math.random() * (max - min) + min
  }

  function selectAnswer(value) {
    $selectedCandidates[0].answers[number - 1].value = value
    $selectedCandidates[0].answers[number - 1].isSelected = true

    const index = $csvData.findIndex(
      (candidate) => candidate.candidate_id === $selectedCandidates[0].id,
    )

    // calculate new coordinates for the selected candidate
    if (index !== -1) {
      $csvData[index].x = getRandomCoordinate(-2.5, 2.5)
      $csvData[index].y = getRandomCoordinate(-2.5, 2.5)
    }
  }
</script>

<div
  class="relative w-[456px] my-2.5 flex items-center border-solid border-red-500 border-2 h-44 duration-700"
>
  <div class="w-full h-full bg-stone-800 px-8 py-6 text-zinc-50">
    <div class=" mb-6 text-lg">
      <span class="position: absolute left-1.5">{number}.</span>
      {question}
    </div>

    <div class="flex justify-center">
      {#each answers as answer, index}
        <!-- svelte-ignore a11y-click-events-have-key-events -->

        <button
          class="ml-1 min-h-16 w-20 cursor-pointer px-2 py-2
                {selectedAnswer.value === answer.value ? 'bg-stone-400' : 'bg-stone-700'}
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
