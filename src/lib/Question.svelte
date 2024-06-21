<script>
  export let question
  export let number

  let selectedAnswer

  const answers = [
    { label: "Yes", value: "yes" },
    { label: "Rather yes", value: "rather_yes" },
    { label: "Rather no", value: "rather_no" },
    { label: "No", value: "no" },
  ]

  function selectAnswer(value) {
    selectedAnswer = value
  }
</script>

<div class=" my-2.5 max-w-xl bg-stone-800 px-8 py-6 text-zinc-50">
  <div class=" mb-6 text-lg">
    {number}. {question}
  </div>
  <div class="flex justify-center">
    {#each answers as answer, index}
      <!-- svelte-ignore a11y-click-events-have-key-events -->

      <button
        class="ml-1 w-20 cursor-pointer px-2 py-1
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
