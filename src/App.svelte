<script>
  import "./app.css"
  import Hero from "./lib/Hero.svelte"
  import Question from "./lib/Question.svelte"
  import DraggableLabel from "./lib/DraggableLabel.svelte"

  import { fade, fly } from "svelte/transition"

  import Scroller from "./lib/Scroller.svelte"
  let count
  let index
  let offset
  let progress
  let top = 0.1
  let threshold = 0.5
  let bottom = 0.9

  const questions = ["Do you like Svelte?", "Do you like Tailwind CSS?", "Do you like Snowpack?"]

  $: console.log(index)
</script>

<DraggableLabel bind:value={top} label="top" />
<DraggableLabel bind:value={threshold} label="threshold" />
<DraggableLabel bind:value={bottom} label="bottom" />
<main>
  <Hero />

  <Scroller {top} {bottom} {threshold} bind:index bind:offset bind:progress>
    <div slot="background">
      {#if index >= 0 && offset > 0}
        <div in:fly={{ duration: 1500, y: "100vh", opacity: 0.5, delay: 0 }} out:fade>
          <Question number={1} question="Do you like Svelte?" step={index} />
        </div>
        <div in:fly={{ duration: 1500, y: "100vh", opacity: 0.5, delay: 100 }} out:fade>
          <Question number={2} question="Do you like Tailwind CSS?" step={index} />
        </div>
        <div in:fly={{ duration: 1500, y: "100vh", opacity: 0.5, delay: 200 }} out:fade>
          <Question number={3} question="Do you like Snowpack?" step={index} />
        </div>
      {/if}
    </div>

    <div slot="foreground">
      <section>
        <p class="flex border">
          First a candidate will be asked to fill a questionnaire with some political questions.
        </p>
      </section>
      <section>
        Each answer corresponds to a particular value - the candidate's answer for each question is
        collected
      </section>
      <section>This is the third section.</section>
    </div>
  </Scroller>

  <Question number={1} question="Do you like Svelte?" />
  <Question number={2} question="Do you like Tailwind CSS?" />
  <Question number={3} question="Do you like Snowpack?" />
  <!-- <Question number={4} question="Do you like Vite?" /> -->
  <Question
    number={5}
    question="Do you like the combination of Svelte, Tailwind CSS, Snowpack, and Vite?"
  />
  <Question
    number={6}
    question="Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, odio?"
  />
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
  }
</style>
