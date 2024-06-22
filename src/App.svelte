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
      <!-- <p></p>

      <p>Section {index + 1} is currently active.</p> -->
      {#if index === 0 && offset > 0}
        <div
          in:fly={{ duration: 1500, y: "100vh", opacity: 0.5, delay: 0 }}
          out:fly={{ duration: 1500, y: "100vh", opacity: 0.5, delay: 600 }}
        >
          <Question number={1} question="Do you like Svelte?" />
        </div>
        <div
          in:fly={{ duration: 1500, y: "100vh", opacity: 0.5, delay: 300 }}
          out:fly={{ duration: 1500, y: "100vh", opacity: 0.5, delay: 300 }}
        >
          <Question number={2} question="Do you like Tailwind CSS?" />
        </div>
        <div
          in:fly={{ duration: 1500, y: "100vh", opacity: 0.5, delay: 600 }}
          out:fly={{ duration: 1500, y: "100vh", opacity: 0.5, delay: 0 }}
        >
          <Question number={3} question="Do you like Snowpack?" />
        </div>
      {/if}
    </div>

    <div slot="foreground" style="padding: 0 50% 0 0 ;">
      <section>
        <p class="flex border">
          First a candidate will be asked to fill a questionnaire with some political questions.
        </p>
      </section>
      <section>This is the second section.</section>
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
  [slot="background"] p {
    margin: 0;
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
