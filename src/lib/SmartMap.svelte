<script>
  import * as d3 from "d3"
  import { csvData } from "../stores/store"
  import { bounceIn } from "svelte/easing"

  let width
  let height

  export let isDesktop
  export let isTablet
  export let isSmallMobile

  $: console.log(isSmallMobile)

  const margin = isSmallMobile
    ? { top: 20, bottom: 10, left: 20, right: 10 }
    : { top: 30, bottom: 20, left: 30, right: 20 }

  const centering = isSmallMobile ? 5 : 10

  $: svgHeight = isTablet ? "height: 570px;" : "height: calc(100vw * 0.75);"

  $: innerWidth = width - margin.left - margin.right
  $: innerHeight = height - margin.top - margin.bottom

  $: xScale = d3
    .scaleLinear()
    .domain(d3.extent($csvData, (d) => d.x))
    .range([margin.left, innerWidth])

  $: yScale = d3
    .scaleLinear()
    .domain(d3.extent($csvData, (d) => d.y))
    .range([innerHeight, margin.top])

  $: xTicks = [
    ...xScale.ticks(10).map((tick) => ({
      x1: xScale(tick),
      y1: margin.top,
      x2: xScale(tick),
      y2: innerHeight,
    })),
    { x1: margin.left, y1: margin.top, x2: innerWidth, y2: margin.top }, // Top border
    { x1: margin.left, y1: innerHeight, x2: innerWidth, y2: innerHeight }, // Bottom border
  ]

  $: yTicks = [
    ...yScale.ticks(10).map((tick) => ({
      x1: margin.left,
      y1: yScale(tick),
      x2: innerWidth,
      y2: yScale(tick),
    })),
    { x1: margin.left, y1: margin.top, x2: margin.left, y2: innerHeight }, // Left border
    { x1: innerWidth, y1: margin.top, x2: innerWidth, y2: innerHeight }, // Right border
  ]
</script>

<div
  class="chart-container bg-neutral-700 max-w-[550px] m-8 sm:mx-auto lg:m-8"
  bind:offsetWidth={width}
  bind:offsetHeight={height}
>
  <svg {width} {height} viewBox={`0 0 ${width} ${height}`} style={svgHeight}>
    <g class="inner-svg" transform={`translate(${centering}, ${centering})`}>
      <g class="grid x-grid">
        {#each xTicks as { x1, y1, x2, y2 }}
          <line {x1} {y1} {x2} {y2} stroke="lightgrey" stroke-opacity="0.7" />
        {/each}
      </g>

      <g class="grid y-grid">
        {#each yTicks as { x1, y1, x2, y2 }}
          <line {x1} {y1} {x2} {y2} stroke="lightgrey" stroke-opacity="0.7" />
        {/each}
      </g>

      {#each $csvData as d}
        <circle
          cx={xScale(d.x)}
          cy={yScale(d.y)}
          r={isDesktop ? 5 : 4}
          fill={d.color}
          stroke="#000000"
          opacity=".9"
        />
      {/each}
    </g>
  </svg>
</div>

<style>
  .chart-container {
    border-radius: 5px;
    box-shadow: 1px 1px 6px #cecece;
  }

  .grid line {
    stroke: lightgrey;
    stroke-opacity: 0.7;
    shape-rendering: crispEdges;
  }
</style>
