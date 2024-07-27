<script>
  import "./app.css"
  import Hero from "./lib/Hero.svelte"
  import Intro from "./lib/Intro.svelte"
  import Question from "./lib/Question.svelte"
  import Vector from "./lib/Vector.svelte"
  import DraggableLabel from "./lib/DraggableLabel.svelte"
  import Scatterplot from "./lib/Scatterplot.svelte"
  import Scroller from "./lib/Scroller.svelte"

  import { fade, slide } from "svelte/transition"
  let count
  let index
  let offset
  let progress

  let top = 0.1
  let threshold = 0.5
  let bottom = 0.9

  const questions = ["Do you like Svelte?", "Do you like Tailwind CSS?", "Do you like Snowpack?"]

  $: firstStep = index >= 0 && progress > -0.2
  $: firstSectionEnd = progress > 0.3
  $: secondStep = index >= 1 && offset > 0.2
  $: secondStepMiddle = index >= 1 && offset > 0.3
</script>

<!-- <DraggableLabel bind:value={top} label="top" />
<DraggableLabel bind:value={threshold} label="threshold" />
<DraggableLabel bind:value={bottom} label="bottom" /> -->
<main class="min-w-[1024px]">
  <Hero />
  <Intro />

  <Scroller {top} {bottom} {threshold} bind:index bind:offset bind:progress>
    <div slot="background">
      <div class="flex min-h-[550px] transition-all">
        {#if firstStep && !secondStepMiddle}
          <div
            class="transition-opacity duration-700"
            class:opacity-0={secondStep}
            class:opacity-100={!secondStep}
          >
            {#each questions as question, i}
              <div
                in:fade|global={{ delay: i * 100 }}
                out:slide|global={{ duration: 800, axis: "x", delay: 700 }}
              >
                <Question number={i + 1} {question} />
              </div>
            {/each}
          </div>
        {/if}
        {#if firstStep}
          <div out:fade class="my-auto">
            <Vector />
          </div>
        {/if}
      </div>
    </div>

    <div slot="foreground">
      <section class="flex min-h-[1000px] justify-start">
        <p class="flex">
          First a candidate will be asked to fill a questionnaire with some political questions. Try
          selecting different answers for candidate X and see how the coordinates change. Also,
          notice that for each answer there is a corresponding numerical value.
        </p>

        <Scatterplot />

        <div class="h-6">
          {#if firstSectionEnd}
            <p transition:fade|global>
              But wait... how are the coordinates coordinates calculated? Scroll down to find out!
            </p>
          {/if}
        </div>
      </section>

      <section>
        <p>Each answer is evaluated and stored inside a vector</p>
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
    /* border: 1px solid black; */
    height: 100vh;
    padding: 1em;
    margin-bottom: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .opacity-0 {
    opacity: 0;
  }
  .opacity-100 {
    opacity: 1;
  }
</style>
