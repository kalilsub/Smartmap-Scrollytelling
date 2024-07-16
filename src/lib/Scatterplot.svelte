<script>
  import * as d3 from "d3"
  import { csvData } from "../stores/store"

  let width
  let height

  const margin = { top: 30, bottom: 30, left: 30, right: 30 }

  // let interplateHeight = 0;
  // let interpolatedWidth = 0;
  $: xScale = d3
    .scaleLinear()
    .domain(d3.extent($csvData, (d) => d.x))
    .range([margin.left, width - margin.right])

  $: yScale = d3
    .scaleLinear()
    .domain(d3.extent($csvData, (d) => d.y))
    .range([height - margin.top, margin.bottom])

  $: xTicks = xScale.ticks(5)
  $: yTicks = yScale.ticks(5)
</script>

<div class="chart-container bg-neutral-700" bind:offsetWidth={width} bind:offsetHeight={height}>
  <svg {width} {height}>
    <g transform="translate(0, {height})">
      {#each xTicks as x}
        <g class="tick" opacity="1" transform="translate({xScale(x)},0)">
          <line stroke="#cecece" x1={0} x2={0} y1={0} y2={-height} />
        </g>
      {/each}
    </g>

    <g transform="translate(0, 0)">
      {#each yTicks as y}
        <g class="tick" opacity="1" transform="translate(0, {yScale(y)})">
          <line stroke="#cecece" x1={0} x2={width} y1={0} y2={0} />
        </g>
      {/each}
    </g>

    <!-- {#each $csvData as d}
      <rect
        x={xScale(d.x)}
        y={yScale(d.y)}
        width={activeStep >= finalStep - 1 ? interpolatedWidth : 20}
        height={activeStep >= finalStep - 1 ? interpolatedHeight(d.y) : 20}
        rx={activeStep >= finalStep - 1 ? interpolatedRadius : 10}
        ry={activeStep >= finalStep - 1 ? interpolatedRadius : 10}
        fill={d.color}
        stroke="#000000"
        opacity=".9"
      />
    {/each} -->

    {#each $csvData as d}
      <circle
        cx={xScale(d.x)}
        cy={yScale(d.y)}
        r={5}
        fill={d.color}
        stroke="#000000"
        opacity=".9"
      />
    {/each}
  </svg>
</div>

<style>
  .chart-container {
    width: 100%;
    max-width: 500px;
    height: 500px;
    margin: 3em;
    border-radius: 5px;
    box-shadow: 1px 1px 6px #cecece;
  }

  circle {
    transition: 1s;
  }
</style>
