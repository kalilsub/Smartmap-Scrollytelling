<script>
  import "./app.css"
  import Hero from "./lib/Hero.svelte"
  import Intro from "./lib/Intro.svelte"
  import Question from "./lib/Question.svelte"
  import Vector from "./lib/Vector.svelte"
  import VectorGroup from "./lib/VectorGroup.svelte"
  import DraggableLabel from "./lib/DraggableLabel.svelte"
  import Scatterplot from "./lib/Scatterplot.svelte"
  import Scroller from "./lib/Scroller.svelte"
  import { selectedCandidate } from "./stores/store"

  import { fade, slide, fly } from "svelte/transition"
  let count
  let index
  let offset
  let progress

  let index2
  let offset2
  let progress2

  let top = 0.1
  let threshold = 0.5
  let bottom = 0.9

  const questions = ["Do you like Svelte?", "Do you like Tailwind CSS?", "Do you like Snowpack?"]

  $: firstStep = index >= 0 && progress > -0.2
  $: firstSectionEnd = progress > 0.3
  $: secondStep = index >= 1 && progress > 0.45
  $: thirdStep = index === 2

  $: fourthStep = progress2 > 0 && progress2 < 0.4
  $: fifthStep = progress2 > 0.4 && progress2 < 0.8
  $: sixthStep = progress2 > 0.8
</script>

<main class="min-w-[1024px]">
  <Hero />
  <Intro />

  <Scroller {top} {bottom} {threshold} bind:index bind:offset bind:progress>
    <div slot="background">
      <div class="flex transition-all">
        {#if firstStep && !secondStep}
          <div
            transition:slide|global={{ duration: 800, axis: "x", delay: 700 }}
            class="transition-opacity duration-700"
          >
            {#each questions as question, i}
              <Question number={i + 1} {question} />
            {/each}
          </div>
        {/if}

        {#if firstStep}
          <div in:fade={{ delay: 1500 }} out:fade>
            <Vector store={$selectedCandidate} {secondStep} />
          </div>
        {/if}

        {#if thirdStep}
          <div in:fly={{ x: -100, delay: 100, duration: 1000, opacity: 0 }} out:fade>
            <Vector gap {secondStep} />
          </div>

          <div in:fly={{ x: -100, delay: 200, duration: 1000, opacity: 0 }} out:fade>
            <Vector gap {secondStep} />
          </div>
        {/if}
      </div>
    </div>

    <div slot="foreground">
      <section class="flex min-h-[1000px] justify-start">
        <div class="border border-solid border-black">
          <p class="flex">
            First a candidate will be asked to fill a questionnaire with some political questions.
            Try selecting different answers for candidate X and see how the coordinates change.
            Also, notice that for each answer there is a corresponding numerical value.
          </p>

          <Scatterplot />

          <div class="h-6">
            {#if firstSectionEnd}
              <p transition:fade|global>
                But wait... how are the coordinates coordinates calculated? Scroll down to find out!
              </p>
            {/if}
          </div>
        </div>
      </section>

      <section class="flex">
        <div class="border border-solid border-black">
          <p>
            In reality the candidate answers 75 questions and the answers are stored as a vector.
          </p>
        </div>
      </section>

      <section class="flex">
        <div class="border border-solid border-black">
          <p>... Also there should be more than 1 candidate</p>
        </div>
      </section>
    </div>
  </Scroller>

  <Scroller
    {top}
    {bottom}
    {threshold}
    layoutDirection="right"
    bind:index={index2}
    bind:offset={offset2}
    bind:progress={progress2}
  >
    <div slot="background">
      {#if progress2 > -0.15}
        <div transition:fade={{ delay: 400 }}>
          <Scatterplot />
        </div>
      {/if}
    </div>

    <div slot="foreground">
      <section class="min-h-[2000px] block">
        <div class="sticky top-20 mt-80 text-center border border-solid border-black">
          <p>We then calculate the euclidean distance between each 2 answer vectors</p>
          {progress2}

          <div class="flex flex-col items-center">
            {#if fourthStep}
              <VectorGroup candidate1={1} candidate2={2} distance={5} />
            {:else if fifthStep}
              <VectorGroup candidate1={1} candidate2={3} distance={4} />
            {:else if sixthStep}
              <VectorGroup candidate1={2} candidate2={3} distance={1} />
            {/if}
          </div>
        </div>
      </section>
    </div>
  </Scroller>
</main>

<style>
  [slot="background"] {
    pointer-events: all;
  }

  [slot="foreground"] {
    pointer-events: none;
  }

  [slot="foreground"] section {
    pointer-events: all;
  }

  section {
    border: 1px solid black;
    height: 100vh;
    padding: 1em;
    margin-bottom: 2em;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>
