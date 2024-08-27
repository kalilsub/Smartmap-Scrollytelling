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
  import Katex from "./lib/Katex.svelte"
  import { selectedCandidates } from "./stores/store"
  import { questions, questionsMobile } from "./data/questions"

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

  // TODO: there has to be a better way
  let isDesktop = false
  let isTablet = false
  let isSmallMobile = false

  let showAnswerVector = false

  $: questionStep = index === 0 && offset > 0.16
  $: vectorStep = index >= 1 && index < 3
  $: showOthervectorsStep = index === 2

  $: distanceStep = index >= 3
  $: calculationOne = index === 3 && offset > 0.13 && offset < 0.42
  $: calculationTwo = index === 3 && offset > 0.42 && offset < 0.71
  $: calculationThree = index === 3 && offset > 0.71

  $: cards = questions

  const myFadeIn = (node, params) => {
    if (params.index === 0) {
      return fade(node, { delay: 1000 })
    }
    if (params.index === 1) {
      return fly(node, { delay: 2000 + params.index * 200, x: -100, duration: 1000 })
    }
    if (params.index === 2) {
      return fly(node, { delay: 2000 + params.index * 200, x: -100, duration: 1000 })
    }
  }

  function checkScreenSize() {
    const lg = window.matchMedia("(min-width: 1024px)")
    const md = window.matchMedia("(min-width: 768px)")
    const xs = window.matchMedia("(max-width: 480px)")

    isDesktop = lg.matches
    isTablet = md.matches
    isSmallMobile = xs.matches
  }

  checkScreenSize()
  window.addEventListener("resize", checkScreenSize)
  const math = "c = \\pm\\sqrt{a^2 + b^2}"
</script>

<!-- class="min-w-[1024px]" -->
<main class="bg-stone-200">
  <!-- <Hero /> -->
  <Intro />
  <!-- <Katex expression={math} displayMode /> -->

  <Scroller {top} {bottom} {threshold} {isDesktop} bind:index bind:offset bind:progress>
    <div slot="background">
      {#if questionStep}
        <div transition:fade={{ delay: 400 }} class="w-full absolute">
          <SmartMap {isDesktop} {isTablet} {isSmallMobile} />
        </div>
      {/if}

      <div class="w-full absolute flex gap-12 xs:gap-24 justify-center">
        {#if vectorStep}
          {#each $selectedCandidates as candidate, i}
            <div in:myFadeIn|global={{ index: i }} out:fade|global>
              <Vector store={candidate} />
            </div>
          {/each}
        {/if}
      </div>

      <!-- {#if vectorStep}
        <div class="flex">
          <div in:myFadeIn={{ bottomBoundary: index === 2 }} out:fade={{ delay: 200 }}>
            <Vector store={$selectedCandidates[0]} modified={vectorStep} />
          </div>
        </div>
      {/if} -->

      <!-- <div class="flex">
        {#if questionStep}
          <div
            transition:slide={{
              duration: 800,
              axis: "x",
              delay: 700,
            }}
          >
            {#each questions as question, i}
              <Question number={i + 1} {question} showChoices={questionStep} />
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
      {/if} -->
    </div>

    <div slot="foreground">
      <!-- min-h-[1000px] -->
      <section class="flex">
        <div class="border border-solid border-black bg-stone-50 opacity-90 max-w-2xl p-4">
          <p class="flex">
            First a candidate will be asked to fill a questionnaire with some political questions.
            Try selecting different answers for candidate X and see how the coordinates change.
            Also, notice that for each answer there is a corresponding numerical value.
          </p>
          <div class="flex flex-wrap gap-2 md:flex-nowrap md:flex-col">
            {#each cards as question, i}
              <Question number={i + 1} {question} />
            {/each}
          </div>

          <!-- <SmartMap /> -->
        </div>
      </section>

      <section class="flex">
        <div class="border border-solid border-black bg-stone-50 opacity-90 max-w-2xl p-4">
          <p>
            In reality the candidate answers 75 questions and the answers are stored as a vector.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse nemo amet soluta ipsum
            voluptatibus quis laborum ratione nihil, quas doloribus.
          </p>
        </div>
      </section>

      <section class="flex">
        <div class="border border-solid border-black bg-stone-50 opacity-90 max-w-2xl p-4">
          <p>
            ... Also there should be more than 1 candidate. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Aperiam sapiente possimus consequuntur aliquam id dicta illo nulla
            veritatis culpa. Cupiditate consequuntur eius in, itaque nihil architecto nulla est ea
            veniam.
          </p>
        </div>
      </section>

      <!-- min-h-[5000px] block -->
      <section class="">
        <div class="sticky top-20 mt-80 text-center border border-solid border-black">
          <p>
            We then calculate the euclidean distance between each 2 answer vectors. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Sint expedita tenetur voluptate sapiente
            quae tempora odit eius autem molestias modi unde perferendis fuga cum laboriosam sequi
            placeat, consequatur qui dicta recusandae, in illum ullam error vitae sit! Quis, iste
            qui!
          </p>

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
    height: 1000px;
    padding: 1em;
    margin-bottom: 2em;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>
