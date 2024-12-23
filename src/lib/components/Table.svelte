<script>
  import { observedFreqs, allAnswers } from "../../data/data"
  import Box from "./viz/Box.svelte"
  import { fade, scale } from "$lib/utils"

  export let xScale
  export let yScale
  export let step

  function getColor(value) {
    return value === 0
      ? "#B73232"
      : value === 0.25
        ? "#C66666"
        : value === 0.5
          ? "#696969"
          : value === 0.75
            ? "#7A97B3"
            : value === 1
              ? "#2B547C"
              : "#44403C"
  }
</script>

{#each observedFreqs as candidate, index}
  {@const random = [0, 0.25, 0.75, 1][Math.floor(Math.random() * 4)]}

  {#if index < 12}
    <Box {xScale} {yScale} row={index} col={-0.8} text={`C${index + 1}`} />

    <Box
      {xScale}
      {yScale}
      row={index}
      col={-0.4}
      text={candidate.x}
      color={getColor(candidate.x)}
    />

    <Box {xScale} {yScale} row={index} col={0} text={candidate.y} color={getColor(candidate.y)} />

    <Box {xScale} {yScale} row={index} col={0.4} text={candidate.z} color={getColor(candidate.z)} />

    {#if step > 4}
      <Box {xScale} {yScale} row={index} col={1.7} text={random} color={getColor(random)} />
    {/if}
  {/if}
{/each}

<Box {xScale} {yScale} row={-1} col={-0.4} text="Q1" />
<Box {xScale} {yScale} row={-1} col={0} text="Q2" />
<Box {xScale} {yScale} row={-1} col={0.4} text="Q3" />

{#if step > 4}
  <Box {xScale} {yScale} row={-1} col={1.7} text="Q75" />
{/if}
