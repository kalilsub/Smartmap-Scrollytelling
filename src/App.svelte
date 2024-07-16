<script>
  import "./app.css"
  import Hero from "./lib/Hero.svelte"
  import Intro from "./lib/Intro.svelte"
  import Question from "./lib/Question.svelte"
  import DraggableLabel from "./lib/DraggableLabel.svelte"
  import Scatterplot from "./lib/Scatterplot.svelte"
  import Scroller from "./lib/Scroller.svelte"

  import { fade, fly } from "svelte/transition"
  let count
  let index
  let offset
  let progress

  let top = 0.1
  let threshold = 0.5
  let bottom = 0.9

  const questions = ["Do you like Svelte?", "Do you like Tailwind CSS?", "Do you like Snowpack?"]

  // $: console.log(progress, offset, index)

  $: firstStep = index >= 0 && progress > -0.2
  $: secondStep = index >= 1 && offset > 0.2
  $: firstSectionEnd = progress > 0.3
</script>

<!-- <DraggableLabel bind:value={top} label="top" />
<DraggableLabel bind:value={threshold} label="threshold" />
<DraggableLabel bind:value={bottom} label="bottom" /> -->
<main class="min-w-[1024px]">
  <Hero />
  <Intro />

  <Scroller {top} {bottom} {threshold} bind:index bind:offset bind:progress>
    <div slot="background">
      <div
        class={`transition-transform ${secondStep ? "-translate-x-[240px] delay-1000 duration-1000 relative" : "translate-x-0 duration-500 delay-0"}  flex min-h-[550px] flex-col items-center`}
      >
        {#if firstStep}
          {#each questions as question, i}
            <div in:fade|global={{ delay: i * 100 }} out:fade|global={{ duration: 300 }}>
              <Question number={i + 1} {question} {secondStep} />
            </div>
          {/each}
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

  <!-- <Scroller
    {top}
    {bottom}
    {threshold}
    bind:index={index2}
    bind:offset={offset2}
    bind:progress={progress2}
  >
    <div slot="background">f</div>

    <div slot="foreground">
      <section>hey</section>
    </div>
  </Scroller> -->
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
</style>
