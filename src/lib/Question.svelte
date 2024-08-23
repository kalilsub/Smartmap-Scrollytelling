<script>
  import { selectedCandidates, csvData } from "../stores/store"
  import { getRandomCoordinate } from "../utils/helpers"
  import { fade } from "svelte/transition"

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
  class="w-full md:w-50 lg:w-full max-w-2xl mx-auto relative flex items-center text-sm xs:text-lg"
>
  <div class="w-full h-full bg-stone-800 px-8 py-6 text-zinc-50">
    <div class="mb-2 xs:mb-6">
      <span class="absolute left-1.5">{number}.</span>
      {question}
    </div>

    <div class="flex justify-center gap-2">
      {#each answers as answer, index}
        <!-- svelte-ignore a11y-click-events-have-key-events -->

        <!--  min-h-16-->
        <button
          class="w-full xs:w-16 ml-1 px-2 py-2 rounded-xl text-sm lg:text-base
                {selectedAnswer.value === answer.value ? 'bg-stone-400' : 'bg-stone-700'}
                "
          on:click={() => selectAnswer(answer.value)}
        >
          {answer.label}
        </button>
      {/each}
    </div>
  </div>
</div>
