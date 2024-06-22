<script>
  export let question
  export let number

  let selectedAnswer

  const answers = [
    { label: "Yes", value: "+2" },
    { label: "Rather yes", value: "+1" },
    { label: "Rather no", value: "-1" },
    { label: "No", value: "-2" },
  ]

  function selectAnswer(value) {
    selectedAnswer = value
  }
</script>

<div class=" m-2.5 max-w-xl bg-stone-800 px-8 py-6 text-zinc-50">
  <div class=" mb-6 text-lg">
    <span class="position: absolute left-5">{number}.</span>
    {question}
  </div>
  <div class="flex justify-center">
    {#each answers as answer, index}
      <!-- svelte-ignore a11y-click-events-have-key-events -->

      <button
        class="ml-1 w-20 cursor-pointer px-2 py-2
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
