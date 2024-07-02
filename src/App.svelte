<script>
  import "./app.css"
  import Hero from "./lib/Hero.svelte"
  import Question from "./lib/Question.svelte"
  import DraggableLabel from "./lib/DraggableLabel.svelte"
  import Scatterplot from "./lib/Scatterplot.svelte"
  // @ts-ignore
  import data from "./data/combined_0.csv"

  import { fade, fly } from "svelte/transition"
  import { processData } from "./utils/process"

  import Scroller from "./lib/Scroller.svelte"
  let count
  let index
  let offset
  let progress
  let top = 0.1
  let threshold = 0.5
  let bottom = 0.9

  processData(data)

  const questions = ["Do you like Svelte?", "Do you like Tailwind CSS?", "Do you like Snowpack?"]

  $: firstSectionInView = index === 0 && offset > 0
  $: secondSectionInView = index >= 1 && offset > 0

  $: console.log(data)
</script>

<DraggableLabel bind:value={top} label="top" />
<DraggableLabel bind:value={threshold} label="threshold" />
<DraggableLabel bind:value={bottom} label="bottom" />
<main>
  <Hero />

  <Scroller {top} {bottom} {threshold} bind:index bind:offset bind:progress>
    <div slot="background">
      {#if firstSectionInView}
        {#each questions as question, i}
          <div
            in:fly|global={{ duration: 1500, y: "100vh", opacity: 0.5, delay: i * 100 }}
            out:fade|global={{ duration: 400 }}
          >
            <Question number={i + 1} {question} />
          </div>
        {/each}
      {/if}
    </div>

    <div slot="foreground">
      <section>
        <p class="flex border">
          First a candidate will be asked to fill a questionnaire with some political questions.
        </p>
        <Scatterplot {data} />
      </section>
      <section>
        Each answer corresponds to a particular value - the candidate's answer for each question is
        collected
      </section>
      <section>This is the third section.</section>
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
    margin: 0 0 2em 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>
