<script>
  import "./app.css"
  import Hero from "$lib/components/Hero.svelte"
  import Intro from "$lib/components/Intro.svelte"
  import Question from "$lib/components/Question.svelte"
  import Scroller from "$lib/components/Scroller.svelte"
  import SectionWrapper from "$lib/components/SectionWrapper.svelte"
  import Main from "$lib/components/Main.svelte"
  import Slider from "$lib/components/ui/slider/slider.svelte"
  import Modal from "$lib/components/Modal.svelte"
  import MainScene from "$lib/components/MainScene.svelte"
  import ChartCanvas from "$lib/components/ChartCanvas.svelte"
  import EndScene from "$lib/components/EndScene.svelte"

  import { allCentered, questions } from "./data/data"
  import { pc1, pc2 } from "./stores/store"
  import { formatCoefficient } from "$lib/utils"
  import VectorSlider from "$lib/components/VectorSlider.svelte"
  import Katex from "$lib/components/Katex.svelte"
  import SmartMap from "$lib/components/Smartmap.svelte"
  import Footer from "$lib/components/Footer.svelte"

  let index
  let offset
  let progress
  let bp

  let top = 0.1
  let threshold = 0.5
  let bottom = 0.9

  let xPC1 = [0.6]
  let yPC1 = [0.9]
  let zPC1 = [0.3]

  let xPC2 = [0.79]
  let yPC2 = [0.41]
  let zPC2 = [0.46]

  const expectedFreqEquation = `
  \\textcolor{#2D5A27}E_
  {\\textcolor{#B73233}i\\textcolor{#2B547C}j} 
  = \\frac{\\textcolor{#B73233}{r_i} \\times \\textcolor{#2B547C}{c_j}}
  {\\textcolor{#8E4163}{N}}`

  const chiSquareDistanceEquation = `
  \\textcolor{#8B5E17}{\\chi^2_{ij}} = 
\\frac{({\\text{Observed}_{ij}} - 
\\textcolor{#2D5A27}{\\text{Expected}_{ij}})^3}{\\textcolor{#2D5A27}{\\text{Expected}_{ij}}}`

  const residualsEquation = `\\textcolor{#8B5E17}{\\text{Residual}_{ij}} = \\text{Observed}_{ij} - \\textcolor{#2D5A27}{\\text{Expected}_{ij}}`

  const standardisedResidualsEquation = `
  \\textcolor{#8E4163}{\\text{Standardised Residual}_{ij}} = 
\\frac{\\textcolor{#8B5E17}{\\text{Residual}_{ij}}}
{\\textcolor{#2D5A27}{\\sqrt{\\text{Expected}_{ij}}}}`

  $: pc1Equation = `${xPC1[0]}Q1${formatCoefficient(yPC1[0], "Q2")}${formatCoefficient(zPC1[0], "Q3")}`

  $: pc2Equation = `${xPC2[0]}Q1${formatCoefficient(yPC2[0], "Q2")}${formatCoefficient(zPC2[0], "Q3")}`

  $: if (index === 16) {
    xPC1 = [-0.17]
    yPC1 = [0.87]
    zPC1 = [-0.47]
    pc1.set({ x: xPC1, y: yPC1, z: zPC1 })
  }

  $: pc1.set({ x: xPC1, y: yPC1, z: zPC1 })
  $: pc2.set({ x: xPC2, y: yPC2, z: zPC2 })
</script>

<Hero />
<Intro />

<Main bind:bp>
  <Scroller {top} {bottom} {threshold} {bp} bind:index bind:offset bind:progress>
    <div slot="background">
      <div class="flex h-[100vh] w-full items-center justify-center {index > 14 && 'flex-col'}">
        {#if index < 19}
          <ChartCanvas {bp} step={index}>
            <MainScene {bp} step={index} />
          </ChartCanvas>
        {/if}

        {#if index > 14}
          <ChartCanvas {bp} step={index}>
            <EndScene step={index} />
          </ChartCanvas>
        {/if}
      </div>
    </div>

    <div slot="foreground">
      <SectionWrapper hidden>
        <!-- 0 -->
        <p>first section</p>
      </SectionWrapper>

      <SectionWrapper>
        <!-- 1 -->
        <p>
          We see here a smartmap that was generated from the candidates that where involved in the
          2023 election. The distribution on the <span class="bg-color-beige">x-axis</span>
          represents the candidates views and opinions on the economy, while the
          <span class="bg-color-beige">y-axis</span> represents their views on social issues.
        </p>
      </SectionWrapper>

      <SectionWrapper>
        <!-- 2 -->
        <p>
          Each color represents a particular party involved in the election. Candidates that share
          similiar political views tend to be <span class="bg-color-light-gray">clustered</span> around
          the same area.
        </p>
        <!-- <Modal {bp} /> -->
      </SectionWrapper>

      <SectionWrapper>
        <!-- 3 -->
        <p class="border-b border-color-dark-gray pb-3">
          The political views are extracted from a questionnaire that the candidates answered. Try
          answering the questions below and see how the position of the white circle changes.
        </p>

        <div class="flex flex-wrap gap-2 md:flex-col md:flex-nowrap">
          {#each questions as question, i}
            <Question number={i + 1} {question} />
          {/each}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <!-- 4 -->
        <p>
          Each answer choice corresponds to a particular value which is stored in a data table. At
          this point, we can already see that alot of candidates disagreed with question 3.
        </p>

        <Question number={1} question={{ label: "" }} showValues />
      </SectionWrapper>

      <SectionWrapper>
        <!-- 5 -->
        <p>
          But what if we had more than 3 questions in our dataset? Visualising the data would be
          impossible! We need a way to summarise the data without losing valuable information.
          Luckily, there is a way to achieve this through Dimensionality Reduction. In the coming
          sections, we will see how we can reduce our sample data from 3D to 2D.
        </p>
      </SectionWrapper>

      <SectionWrapper>
        <!-- 6 -->
        <p>
          Let's begin by visualising our the candidate answers in a scatterplot. We have 3 axes that
          represent the 3 questions in our dataset:
          <span class="bg-color-accent-blue p-0.5 text-color-white">Retirement age increase</span>,
          <span class=" bg-color-accent-red p-0.5 text-color-white"
            >Healthcare subsidy expansion</span
          >
          and
          <span class="bg-color-accent-yellow p-0.5 text-color-white">Swiss-EU border control</span
          >. The further away the data points are from the origin, the more the candidate agreed
          with the question.
        </p>
      </SectionWrapper>

      <SectionWrapper>
        <!-- 7 -->
        <p>
          From the big cluster at the top left corner, we can see that there is a relationship
          between <span class="bg-color-accent-blue p-0.5 text-color-white"
            >Retirement age increase</span
          >,
          <span class=" bg-color-accent-red p-0.5 text-color-white"
            >Healthcare subsidy expansion</span
          > which could possibly mean that our data is not independent. To confirm this, we can calculate
          the expected answers assuming that candidates and questions are independent from one another.
        </p>
      </SectionWrapper>

      <SectionWrapper>
        <!-- 8 -->
        <p>
          Well look at that! the expected answers under the assumption of independence are quite
          different from the actual answers. This of course makes sense, since we'd expect
          candidates to answer the questions based on their political views and not just randomly.
        </p>
      </SectionWrapper>

      <SectionWrapper>
        <!-- 9 -->
        <p>
          The shape of the graph also suggests that candidates who are in support of <span
            class="bg-color-accent-blue p-0.5 text-color-white">Retirement age increase</span
          >
          tend to disagree with
          <span class=" bg-color-accent-red p-0.5 text-color-white"
            >Healthcare subsidy expansion</span
          > and vice versa. This directly opposes the actual answers we have seen previously - our data
          deviates from the independence assumption.
        </p>
      </SectionWrapper>

      <SectionWrapper>
        <!-- 10 -->
        <p>
          To see how much each candidate's observed answers deviate from the expected answers, we
          calculate the residuals. The further away the data points are from the origin, the bigger
          the deviation from the expected answers under independence and ultimately the bigger the
          impact it has on the final solution.
        </p>
      </SectionWrapper>

      <SectionWrapper>
        <!-- 11 -->
        <p>
          Let's take a look at the deviations for <span
            class="bg-color-accent-yellow p-0.5 text-color-white">Swiss-EU border control</span
          >. The majority of candidates didn't deviate much from the expected answers except the SVP
          candidates, who showed a strong negative deviation.
        </p>
      </SectionWrapper>

      <SectionWrapper>
        <!-- 12 -->
        <p>
          From this view we can also see that <span
            class=" bg-color-accent-red p-0.5 text-color-white">Healthcare subsidy expansion</span
          > has both positive and negative deviations, where the positive deviations are more pronounced.
        </p>
      </SectionWrapper>

      <SectionWrapper>
        <!-- 13 -->
        <p>
          The deviations for <span class="bg-color-accent-blue p-0.5 text-color-white"
            >Retirement age increase</span
          > are also spread out, but the negative deviations are more.
        </p>
      </SectionWrapper>

      <SectionWrapper>
        <!-- 14 -->
        <p>
          Now, with this information we try to extract 2 new axes that best represent the data. The
          first axis is called the <span class="bg-color-accent-purple p-0.5 text-color-white"
            >Principal Component 1 (PC1)</span
          > - it represents the axis that captures the most variance in the data.
        </p>
      </SectionWrapper>

      <SectionWrapper>
        <!-- 15 -->
        <p>
          we need to find a line that goes through the origin and maximises the spread of the data
          points. Try setting the weights of the axes and see if you can find PC1 . (Hint: the
          deviations we saw earlier will help you find the right direction)
        </p>
        <div class="mt-2 w-full max-w-lg">
          <VectorSlider bind:value={xPC1} step={0.01} label="Q1" />
          <VectorSlider bind:value={yPC1} step={0.01} label="Q2" />
          <VectorSlider bind:value={zPC1} step={0.01} label="Q3" />
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <!-- 16 -->
        <p>
          If you've found the right direction, your weights should correspond to the following
          equation <Katex expression={pc1Equation} />Candidates on the left support expanded
          healthcare, protected retirement, open borders which shows a general support for left-wing
          political views. Candidates on the right side are more in favour for limited benefits,
          stricter borders, individual responsibility which is charactersitic for right-wing
          political views.
        </p>
      </SectionWrapper>

      <SectionWrapper>
        <!-- 17 -->
        <p>
          For the second axis (PC2), it needs to be orthogonal to PC1 and capture the second most
          variance in the data which is represented by the plane.
        </p>
      </SectionWrapper>

      <SectionWrapper>
        <!-- 18 -->
        <p>
          Here are the weights for PC2: <Katex expression={pc2Equation} />The axis does not
          represent a classical left/right or liberal/conservative distribution but rather the
          approach of governance. Candidates on the bottom are in favour of a governmental reform
          (support structural changes, active policy intervention) vs. candidates who are in favour
          of the current system (resists changes to existing systems and policies).
        </p>
      </SectionWrapper>

      <SectionWrapper>
        <!-- 19 -->
        <p>
          If we compare the original smartmap with the one we created, we can see that the
          candidates's positions are relatively correct. However, the y-axis interpretation is not
          as clear as the x-axis. This is due to the 3-question sample size we have. If we had more
          questions, the y-axis would more similiar to the original smartmap.
        </p>

        <SmartMap {bp} />
      </SectionWrapper>
    </div>
  </Scroller>
</Main>
<Footer />

<style>
  [slot="background"] {
    pointer-events: all;
  }

  [slot="foreground"] {
    pointer-events: all;
  }
</style>
