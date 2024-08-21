<script>
  import "./app.css"
  import Hero from "./lib/Hero.svelte"
  import Intro from "./lib/Intro.svelte"
  import Question from "./lib/Question.svelte"
  import Vector from "./lib/Vector.svelte"
  import VectorGroup from "./lib/VectorGroup.svelte"
  import DraggableLabel from "./lib/DraggableLabel.svelte"
  import SmartMap from "./lib/SmartMap.svelte"
  import Grid from "./lib/Grid.svelte"
  import Scroller from "./lib/Scroller.svelte"
  import Avatar from "./lib/Avatar.svelte"
  import { selectedCandidates } from "./stores/store"

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

  $: questionStep = index === 0 && offset > 0.16
  $: vectorStep = index >= 1 && index < 3
  $: showOthervectorsStep = index === 2

  $: distanceStep = index >= 3
  $: calculationOne = index === 3 && offset > 0.13 && offset < 0.42
  $: calculationTwo = index === 3 && offset > 0.42 && offset < 0.71
  $: calculationThree = index === 3 && offset > 0.71

  $: myFadeIn = (node, params) => {
    if (params.bottomBoundary) {
      return fade(node, { ...params, delay: 100 })
    } else {
      return fade(node, { ...params, delay: 1500 })
    }
  }
</script>

<main class="min-w-[1024px]">
  <Hero />
  <Intro />

  <Scroller {top} {bottom} {threshold} bind:index bind:offset bind:progress>
    <div slot="background">
      <div class="flex">
        {#if questionStep}
          <div
            transition:slide={{
              duration: 800,
              axis: "x",
              delay: 700,
            }}
          >
            {#each questions as question, i}
              <Question number={i + 1} {question} />
            {/each}
          </div>
        {/if}

        <div class="flex">
          {#if questionStep || vectorStep}
            <div in:myFadeIn={{ bottomBoundary: index === 2 }} out:fade={{ delay: 200 }}>
              <Vector store={$selectedCandidates[0]} modified={vectorStep} />
            </div>
          {/if}

          {#if showOthervectorsStep}
            <div
              in:fly={{
                x: -100,
                delay: 100,
                duration: 1000,
                opacity: 0,
              }}
              out:fade={{ delay: 200 }}
            >
              <Vector store={$selectedCandidates[1]} gap modified={vectorStep} />
            </div>

            <div
              in:fly={{
                x: -100,
                delay: 200,
                duration: 1000,
                opacity: 0,
              }}
              out:fade={{ delay: 200 }}
            >
              <Vector store={$selectedCandidates[2]} gap modified={vectorStep} />
            </div>
          {/if}
        </div>
      </div>

      {#if showOthervectorsStep}
        <div class="flex w-[354px] justify-between px-3 mt-5">
          {#each [1, 2, 3] as candidate}
            <div in:fly|global={{ y: 100, duration: 1000, delay: 200, opacity: 0 }} out:fly|global>
              <Avatar imageSrc={`/images/candidate-${candidate}.jpg`} />
            </div>
          {/each}
        </div>
      {/if}

      {#if distanceStep}
        <div in:fade={{ delay: 700 }}>
          <Grid scrollPosition={offset} />
        </div>
      {/if}
    </div>

    <div slot="foreground">
      <section class="flex min-h-[1000px] justify-start">
        <div class="border border-solid border-black">
          <p class="flex">
            First a candidate will be asked to fill a questionnaire with some political questions.
            Try selecting different answers for candidate X and see how the coordinates change.
            Also, notice that for each answer there is a corresponding numerical value.
          </p>

          <SmartMap />
          <p>
            But wait... how are the coordinates coordinates calculated? Scroll down to find out!
          </p>
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

      <section class="min-h-[5000px] block">
        <div class="sticky top-20 mt-80 text-center border border-solid border-black">
          <p>We then calculate the euclidean distance between each 2 answer vectors</p>

          <div class="flex flex-col items-center">
            {#if calculationOne}
              <VectorGroup candidate1={1} candidate2={2} />
            {:else if calculationTwo}
              <VectorGroup candidate1={1} candidate2={3} />
            {:else if calculationThree}
              <VectorGroup candidate1={2} candidate2={3} />
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
