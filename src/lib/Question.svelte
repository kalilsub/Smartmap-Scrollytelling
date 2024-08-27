<script>
  import { selectedCandidates, csvData } from "../stores/store"
  import { getRandomCoordinate } from "../utils/helpers"
  import { scale } from "svelte/transition"

  export let question
  export let number

  const answers = [
    { label: "Yes", value: 1.0 },
    { label: "Rather yes", value: 0.75 },
    { label: "Rather no", value: 0.5 },
    { label: "No", value: 0.25 },
  ]

  $: selectedAnswer = $selectedCandidates[0].answers[number - 1]

  function selectAnswer(value) {
    $selectedCandidates[0].answers[number - 1].value = value
    $selectedCandidates[0].answers[number - 1].isSelected = true

    const index = $csvData.findIndex(
      (candidate) => candidate.candidate_id === $selectedCandidates[0].id,
    )

    // calculate new coordinates for the selected candidate
    if (index !== -1) {
      csvData.set(
        $csvData.map((candidate, i) => {
          if (i === index) {
            return {
              ...candidate,
              x: getRandomCoordinate(-2.5, 2.5),
              y: getRandomCoordinate(-2.5, 2.5),
            }
          }
          return candidate
        }),
      )
    }
  }
</script>

<!-- w-[456px] h-44-->
<div
  class="w-full lg:w-full max-w-2xl mx-auto my-3 relative flex items-center text-sm xs:text-base"
>
  <div class="w-full h-full px-8">
    <div class="mb-2 xs:mb-6">
      <span class="absolute left-1.5">{number}.</span>
      {question}
    </div>

    <div class="flex justify-center gap-2 mr-5">
      {#each answers as answer, index}
        <!--  min-h-16-->
        <button
          class="w-full py-2 px-1 rounded-xl text-sm text-gray-50 font-medium transition-colors duration-300
                {selectedAnswer.value === answer.value
            ? 'bg-stone-400'
            : 'bg-stone-700 hover:bg-stone-500'}
                "
          on:click={() => selectAnswer(answer.value)}
        >
          {answer.label}
        </button>
      {/each}
    </div>

    {#key selectedAnswer.value}
      <span
        transition:scale={{ duration: 600 }}
        class="min-w-9 h-9 my-auto flex justify-center items-center rounded-2xl bg-stone-700 text-gray-50 text-center absolute right-0 bottom-px max-xs:bottom-3"
      >
        {selectedAnswer.value}
      </span>
    {/key}
  </div>
</div>
