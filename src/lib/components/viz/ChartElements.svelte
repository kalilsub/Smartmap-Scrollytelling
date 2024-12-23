<script>
  import { Grid } from "@threlte/extras"
  import {
    axisArrowRotation,
    axisDimensions,
    axisLabels,
    gridProperties,
    labelRotation,
  } from "../../../stores/store"
  import {
    initialAxisArrowRotation,
    initialAxisDimensions,
    initialAxisLabels,
    initialLabelRotation,
  } from "../../../data/data"

  import Label from "./Label.svelte"
  import Axis from "./Axis.svelte"

  export let xScale
  export let yScale
  export let zScale
  export let step

  const axisColors = { x: "#2B547C", y: "#B73232", z: "#8B5E17" }

  $: showResdidualAxes = step > 9
  $: showXYAxes = step === 9

  $: if (step) {
    updateChartElements()
  }

  function updateChartElements() {
    if (showXYAxes) {
      labelRotation.set({ x: 0, y: Math.PI, z: 0 })
      axisDimensions.set(initialAxisDimensions)
      axisLabels.set(initialAxisLabels)
    }
    if (showResdidualAxes) {
      labelRotation.set(initialLabelRotation)
      axisDimensions.set({
        x1: [1, 0, 0],
        x2: [-1.2, 0, 0],
        y1: [0, 1.35, 0],
        y2: [0, -1, 0],
        z1: [0, 0, 3],
        z2: [0, 0, -3],
      })

      axisLabels.set({
        x: [1.35, 0, 0],
        y: [0, 1.65, 0],
        z: [0, 0, 3.5],
      })

      axisArrowRotation.set({
        x: [0, 0, -Math.PI / 2],
        y: [0, 0, 0],
        z: [0, -Math.PI / 2, -Math.PI / 2],
      })
    } else {
      axisDimensions.set(initialAxisDimensions)
      axisLabels.set(initialAxisLabels)
      labelRotation.set(initialLabelRotation)
      axisArrowRotation.set(initialAxisArrowRotation)
    }
  }

  $: labelRotations = showXYAxes ? { x: 0, y: Math.PI, z: 0 } : initialLabelRotation
</script>

{#if step < 4}
  <Label
    text="Left"
    position={{ x: xScale(-1.1), y: yScale(0) + 1, z: zScale(0.1) }}
    fontSize={0.8}
    rotation={{ x: 0, y: 0, z: Math.PI / 2 }}
  />
  <Label
    text="Right"
    fontSize={0.8}
    position={{ x: xScale(1.1), y: yScale(0) + 1, z: zScale(0.1) }}
    rotation={{ x: 0, y: 0, z: -Math.PI / 2 }}
  />

  <Label
    text="Conservative"
    position={{ x: xScale(0), y: yScale(-1.1) + 1, z: zScale(0.1) }}
    fontSize={0.8}
  />
  <Label
    text="Liberal"
    position={{ x: xScale(0), y: yScale(1.1) + 1, z: zScale(0.1) }}
    fontSize={0.8}
  />
{/if}

{#if step < 5}
  <Grid
    plane="xy"
    gridSize={$gridProperties.gridSize}
    sectionSize={$gridProperties.sectionSize}
    sectionThickness={$gridProperties.sectionThickness}
    sectionColor="#D5CEC9"
    cellSize={$gridProperties.cellSize}
    cellThickness={$gridProperties.cellThickness}
    cellColor="#D5CEC9"
    fadeDistance={400}
    position.x={$gridProperties.positionXY.x}
    position.y={$gridProperties.positionXY.y}
    position.z={$gridProperties.positionXY.z}
  />
{/if}

{#if step > 4}
  <Axis {xScale} {yScale} {zScale} {step} axis="x" color={axisColors.x} {labelRotations} />
  <Axis {xScale} {yScale} {zScale} {step} axis="y" color={axisColors.y} {labelRotations} />

  {#if step !== 9}
    <Axis {xScale} {yScale} {zScale} {step} axis="z" color={axisColors.z} {labelRotations} />
  {/if}
{/if}
