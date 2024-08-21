<script>
  import { scaleLinear } from "d3-scale"
  import { scale, fade, fly } from "svelte/transition"

  import { vectorDistances, candidatePoints, candidateDistances } from "../stores/store"
  import { data } from "../data/candidateCoordinates"
  import { adjustPoints } from "../utils/helpers"

  export let scrollPosition

  let width = 400,
    height = 400

  const margin = { top: 10, right: 10, bottom: 10, left: 10 }

  $: innerWidth = width - margin.left - margin.right
  let innerHeight = height - margin.top - margin.bottom

  $: xScale = scaleLinear().domain([0, 10]).range([margin.left, innerWidth])
  $: yScale = scaleLinear().domain([0, 10]).range([innerHeight, margin.top])
  $: distanceScale = scaleLinear()
    .domain([0, Math.sqrt(3)])
    .range([0, Math.sqrt(200)])
  $: ticks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  // vector distances are standardised to a scale of 0 to 200^0.5
  $: normalisedDistances = $vectorDistances.map((vector) => distanceScale(vector.distance))

  // new coordinates for the candidate points,
  // based on the calculated vector distances
  $: newPoints = adjustPoints($candidatePoints, normalisedDistances)

  $: if (scrollPosition > 0.13) {
    candidatePoints.set(newPoints)
  } else {
    // reset
    candidatePoints.set(data)
  }
</script>

<div>
  <svg {width} {height} class="mx-auto my-0">
    <!-- y axis -->
    <g class="axis y-axis">
      {#each ticks as tick}
        <g class="tick tick-{tick}" transform="translate(0, {yScale(tick)})">
          <line x1={margin.left} x2={xScale(10)} />
        </g>
      {/each}
    </g>

    <!-- x axis -->
    <g class="axis x-axis">
      {#each ticks as tick}
        <g class="tick" transform="translate({xScale(tick)},0)">
          <line y1={yScale(0)} y2={yScale(10)} />
        </g>
      {/each}
    </g>

    <!-- Lines and distances -->
    {#each $candidateDistances as { pair, distance }}
      <line
        in:fade|global
        x1={xScale(pair[0].x)}
        y1={yScale(pair[0].y)}
        x2={xScale(pair[1].x)}
        y2={yScale(pair[1].y)}
        stroke="blue"
        stroke-width="2"
      />
      <text
        in:fade|global
        x={(xScale(pair[0].x) + xScale(pair[1].x)) / 2}
        y={(yScale(pair[0].y) + yScale(pair[1].y)) / 2}
        fill="black"
        font-size="12"
        text-anchor="middle"
        class=""
      >
        {distance}
      </text>
    {/each}

    {#each $candidatePoints as point, index}
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <!-- <circle
        cx={point.x}
        cy={point.y}
        r="10"
        fill="red"
        on:mousedown={(event) => handleMouseDown(event, point)}
      /> -->

      <image
        in:fly|global={{ y: -50, duration: 1000, delay: 100 * index }}
        x={xScale(point.x) - 10}
        y={yScale(point.y) - 10}
        width="35"
        height="35"
        href={`/images/candidate-${index + 1}.jpg`}
        clip-path="inset(0% round 15px)"
      />
    {/each}
  </svg>
</div>

<style>
  .tick line {
    stroke: red;
    stroke-dasharray: 2;
  }
</style>
