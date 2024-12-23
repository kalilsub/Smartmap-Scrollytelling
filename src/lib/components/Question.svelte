<script>
  import { newCandidate } from "../../stores/store"
  import { combinations } from "../../data/data"

  export let question
  export let number
  export let showValues = false

  const answers = [
    { label: "Yes", value: 3.0, answerValue: 1 },
    { label: "Rather yes", value: 2.0, answerValue: 0.75 },
    { label: "No answer", value: -1.0, answerValue: 0.5 },
    { label: "Rather no", value: 1.0, answerValue: 0.25 },
    { label: "No", value: 0.0, answerValue: 0 },
  ]

  $: selectedAnswer = $newCandidate.answers[number - 1]
  $: updateCandidatePosition()

  function updateCandidatePosition() {
    const answerCombination = $newCandidate.answers.map((answer) => answer.value)
    combinations.forEach((combination) => {
      if (
        +combination.answer_32214 === answerCombination[0] &&
        +combination.answer_32215 === answerCombination[1] &&
        +combination.answer_32268 === answerCombination[2]
      ) {
        newCandidate.update((candidate) => ({
          ...candidate,
          x: combination.x,
          y: combination.y,
        }))
      }
    })
  }

  function selectAnswer(value, id) {
    selectedAnswer.value = value

    updateCandidatePosition()
  }

  function showAnswerValue(value) {
    if (value === 0) {
      return "bg-color-accent-red text-color-white"
    }
    if (value === 0.25) {
      return "bg-color-accent-light-red text-color-white"
    }
    if (value === 0.5) {
      return "bg-color-accent-neutral text-color-white"
    }
    if (value === 0.75) {
      return "bg-color-accent-light-blue text-color-white"
    }
    if (value === 1) {
      return "bg-color-accent-blue text-color-white"
    }
  }
</script>

<div class="relative mx-auto my-3 flex w-full max-w-2xl items-center lg:w-full">
  <div class="h-full w-full px-8">
    <div class="mb-2 xs:mb-6">
      {question.label}
    </div>

    <div class="flex justify-center gap-2">
      {#each answers as answer}
        <button
          disabled={showValues}
          class=" w-full rounded-xl px-1 py-3 text-sm font-medium transition-colors duration-300
                {showValues
            ? showAnswerValue(answer.answerValue)
            : selectedAnswer.value === answer.value
              ? 'bg-color-light-gray text-color-dark-gray'
              : 'bg-color-dark-gray text-color-white hover:bg-stone-500'}
                
                "
          on:click={() => selectAnswer(answer.value, question.id)}
        >
          {answer.label}
          <p>{showValues ? answer.answerValue : ""}</p>
        </button>
      {/each}
    </div>
  </div>
</div>
