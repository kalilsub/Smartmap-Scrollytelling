<script>
  import { scaleLinear } from "d3-scale"
  import { coordinates } from "../../data/data"

  // import GridLines from "./viz/GridLines.svelte"

  let height, width

  export let bp
  export let margin = { top: 20, right: 20, bottom: 20, left: 20 }
  export let centering = 5

  $: innerWidth = width - margin.left - margin.right
  $: innerHeight = height - margin.top - margin.bottom

  $: xScale = scaleLinear().domain([-1, 1]).range([margin.left, innerWidth])
  $: yScale = scaleLinear().domain([-1, 1]).range([innerHeight, margin.top])

  $: xTicks = [
    ...xScale.ticks(10).map((tick) => ({
      x1: xScale(tick),
      y1: margin.top,
      x2: xScale(tick),
      y2: innerHeight,
    })),
    {
      x1: margin.left,
      y1: margin.top,
      x2: innerWidth,
      y2: margin.top,
      label: "Liberal",
      border: true,
    }, // Top border
    {
      x1: margin.left,
      y1: innerHeight,
      x2: innerWidth,
      y2: innerHeight,
      label: "Conservative",
      border: true,
    }, // Bottom border
  ]

  $: yTicks = [
    ...yScale.ticks(10).map((tick) => ({
      x1: margin.left,
      y1: yScale(tick),
      x2: innerWidth,
      y2: yScale(tick),
    })),
    {
      x1: margin.left,
      y1: margin.top,
      x2: margin.left,
      y2: innerHeight,
      label: "Left",
      border: true,
    }, // Left border
    {
      x1: innerWidth,
      y1: margin.top,
      x2: innerWidth,
      y2: innerHeight,
      label: "Right",
      border: true,
    }, // Right border
  ]
</script>

<div class="mx-auto h-[300px] w-[300px]" bind:offsetWidth={width} bind:offsetHeight={height}>
  <svg {width} {height} viewBox={`0 0 ${width} ${height}`}>
    <g class="inner-svg" transform={`translate(${centering}, ${centering})`}>
      <g class="x-grid grid">
        {#each xTicks as { x1, y1, x2, y2, label, border }}
          <line
            class={border ? "stroke-color-dark-gray stroke-2" : "stroke-color-dark-gray stroke-1"}
            {x1}
            {y1}
            {x2}
            {y2}
          />

          {#if label === "Liberal"}
            <text x={(x1 + x2) / 2} y={y1 - 10} text-anchor="middle" class="fill-color-dark-gray"
              >{label}</text
            >
          {:else if label === "Conservative"}
            <text x={(x1 + x2) / 2} y={y2 + 20} text-anchor="middle" class="fill-color-dark-gray"
              >{label}</text
            >
          {/if}
        {/each}
      </g>

      <g class="y-grid grid">
        {#each yTicks as { x1, y1, x2, y2, label, border }}
          <line
            class={border ? "stroke-color-dark-gray stroke-2" : "stroke-color-dark-gray stroke-1"}
            {x1}
            {y1}
            {x2}
            {y2}
          />

          {#if label === "Left"}
            <text
              x={x1 - 10}
              y={(y1 + y2) / 2 + 5}
              text-anchor="middle"
              class="fill-color-dark-gray"
              transform={`rotate(-90, ${x1 - 15}, ${(y1 + y2) / 2})`}>{label}</text
            >
          {:else if label === "Right"}
            <text
              x={x2 + 10}
              y={(y1 + y2) / 2 + 5}
              text-anchor="middle"
              class="fill-color-dark-gray"
              transform={`rotate(90, ${x2 + 15}, ${(y1 + y2) / 2})`}>{label}</text
            >
          {/if}
        {/each}
      </g>

      {#each coordinates as { x, y, color, id }}
        <circle
          id={`${x}-${y}`}
          class="circle"
          cx={xScale(x)}
          cy={yScale(y)}
          r={5}
          fill={color}
          stroke="#000000"
          opacity=".9"
        />
      {/each}
    </g>
  </svg>
</div>

<style>
  .circle {
    transition:
      r 0.5s,
      fill 0.5s;
  }
</style>
