<script>
  import {
    smartmapData,
    newCandidate,
    cameraPosition,
    gridProperties,
    domain,
    deviation,
    pc1,
    pc2,
  } from "../../stores/store"
  import {
    coordinates,
    observedFreqsAdjusted,
    expectedFreqsAdjusted,
    standardisedResidualsAdjusted,
    residualsAdjusted,
    initialGrid,
    initialDomain,
    initialCameraPosition,
    scatterCameraPosition,
    scatterDomain,
    standardisedResidualsDomain,
    initialDeviation,
  } from "../../data/data"
  import { fade, fly, scale } from "$lib/utils"

  import { Grid, transitions, interactivity } from "@threlte/extras"
  import { scaleLinear } from "d3-scale"
  import { max, min } from "d3-array"
  import Camera from "./Camera.svelte"
  import Sphere from "./viz/Sphere.svelte"
  import Table from "./Table.svelte"
  import Axes from "./viz/ChartElements.svelte"
  import PrincipalComponent from "./viz/PrincipalComponent.svelte"
  import { T } from "@threlte/core"
  import Line from "./viz/Line.svelte"
  import Arrow from "./viz/Arrow.svelte"

  export let step
  export let bp

  $: xCells = [-0.8, -0.4, 0, 0.4]
  $: yCells = [-1.3, -1.115, -0.9, -0.7, -0.5, -0.3, -0.1, 0.1, 0.3, 0.5, 0.7, 0.9]

  const xEllipses = [0.65, 0.75, 0.85, 0.95, 1.05, 1.15, 1.25, 1.35, 1.45]

  $: xScale = scaleLinear().domain($domain.x).range([-10, 10])
  $: yScale = scaleLinear().domain($domain.y).range([-10, 10])
  $: zScale = scaleLinear().domain($domain.z).range([-10, 10])

  $: showAxes = step === 1
  $: showCluster = step === 2
  $: showNewCandidate = step === 3
  $: showAnswersTable = step === 4
  $: showExtendedTable = step === 5

  $: showObserved = step > 5 && step < 8
  $: showObservedCluster = step === 7

  $: showExpected = step > 7 && step < 10
  $: showExpectedSlope = step === 9

  $: showStandardisedResiduals = step > 9 && step < 18
  $: showDeviationQ3 = step === 11
  $: showDeviationQ2 = step === 12
  $: showDeviationQ1 = step === 13

  $: showPC1 = step > 13
  $: showBothScenes = step > 14 && step < 18
  $: showPC2 = step > 17

  $: if (step) {
    updateScene()
  }

  function updatePoints(data) {
    smartmapData.set(
      $smartmapData.map((candidate, index) => ({
        ...candidate,
        x: data[index].x,
        y: data[index].y,
        z: data[index].z,
      })),
    )
  }

  function updateCamera(position) {
    cameraPosition.set(position)
  }

  function updateDomain(values) {
    domain.set(values)
  }

  function updateTable() {
    smartmapData.set(
      $smartmapData.map((candidate, index) => ({
        ...candidate,
        x: xCells[index % xCells.length],
        y: yCells[Math.floor(index / yCells.length) % yCells.length],
        z: 0,
      })),
    )
  }

  function updateScene() {
    if (showAnswersTable) {
      xCells = [-0.8, -0.4, 0, 0.4]

      updateTable()
      updateDomain(initialDomain)
      updateCamera(initialCameraPosition)

      gridProperties.set({
        ...$gridProperties,
        gridSize: 12,
        cellThickness: 5,
      })
    } else if (showExtendedTable) {
      xCells = [...xCells, ...xEllipses]

      updateTable()
      updateCamera([0, 1, 50])
      updateDomain(initialDomain)

      gridProperties.set({
        ...$gridProperties,
        gridSize: 12,
        cellThickness: 5,
      })
    } else if (showObserved) {
      updatePoints(observedFreqsAdjusted)
      updateCamera(scatterCameraPosition)
      updateDomain(scatterDomain)
    } else if (showExpected) {
      updatePoints(expectedFreqsAdjusted)
      updateCamera(scatterCameraPosition)
      updateDomain(scatterDomain)

      if (showExpectedSlope) {
        updateCamera([0, 3, -50])
      }
    } else if (showStandardisedResiduals) {
      updatePoints(standardisedResidualsAdjusted)
      updateCamera([-24, 20, 35])
      updateDomain(standardisedResidualsDomain)

      if (showDeviationQ3) {
        updateCamera([-45, 0, 0])
        deviation.set(initialDeviation)
      }
      if (showDeviationQ2) {
        updateCamera([-45, 0, 0])
        deviation.set({
          start: [-1, 0.9, 0],
          end: [-1, -0.4, 0],
          arrowRotationStart: [0, 0, 0],
          arrowRotationEnd: [Math.PI, 0, 0],
        })
      }
      if (showDeviationQ1) {
        updateCamera([0, 0, 45])
        deviation.set({
          start: [-1, 0, 1],
          end: [0.65, 0, 1],
          arrowRotationStart: [0, 0, Math.PI / 2],
          arrowRotationEnd: [0, 0, -Math.PI / 2],
        })
      }
    } else if (showPC1 || showPC2) {
      updatePoints(standardisedResidualsAdjusted)
      updateCamera([-24, 20, 35])
      updateDomain(standardisedResidualsDomain)

      if (showBothScenes) {
        updateCamera([-20, 9, 22])
      }
    } else {
      updatePoints(coordinates)
      updateCamera(initialCameraPosition)
      updateDomain(initialDomain)
      gridProperties.set(initialGrid)
    }
  }

  interactivity()
  transitions()
</script>

<Camera {step} {bp} />

{#if !showAnswersTable && !showExtendedTable}
  <Axes {xScale} {yScale} {zScale} {step} />
{/if}

{#each $smartmapData as point, index}
  <Sphere
    position={{ x: xScale(point.x), y: yScale(point.y) + 1, z: zScale(point.z) }}
    color={showExtendedTable ? "gray" : point.color}
    radius={0.25}
    actualPosition={{ x: point.x, y: point.y, z: point.z }}
  />
{/each}

{#if showAnswersTable || showExtendedTable}
  <Table {xScale} {yScale} {step} />
{/if}

{#if showNewCandidate}
  <Sphere
    position={{ x: xScale($newCandidate.x), y: yScale($newCandidate.y) + 1, z: 0.5 }}
    color="black"
    radius={0.3}
  />
{/if}

{#if showPC1}
  <PrincipalComponent {xScale} {yScale} {zScale} />
{/if}

{#if showPC2}
  <PrincipalComponent {xScale} {yScale} {zScale} isPC2 />
{/if}

{#if showObservedCluster}
  <T.Mesh
    position.x={xScale(0)}
    position.y={yScale(1) + 1}
    position.z={zScale(0)}
    castShadow
    transition={scale(900)}
  >
    <T.TorusGeometry args={[2.5, 0.1]} />
    <T.MeshStandardMaterial color="#D5CEC9" transition={fade(900)} opacity={0.1} />
  </T.Mesh>
{/if}

{#if showDeviationQ1 || showDeviationQ2 || showDeviationQ3}
  <Line start={$deviation.start} end={$deviation.end} {xScale} {yScale} {zScale} color="black" />

  <Arrow
    {xScale}
    {yScale}
    {zScale}
    position={$deviation.start}
    color="black"
    rotation={$deviation.arrowRotationStart}
  />

  <Arrow
    {xScale}
    {yScale}
    {zScale}
    position={$deviation.end}
    color="black"
    rotation={$deviation.arrowRotationEnd}
  />
{/if}

{#if step === 17}
  <T.Mesh
    position.x={0}
    position.y={0}
    position.z={0}
    castShadow
    transition={scale(900)}
    rotation.x={Math.PI / 2 - $pc1.x[0]}
    rotation.y={$pc2.y}
    rotation.z={0}
  >
    <T.BoxGeometry args={[20, 20, 0.1]} />
    <T.MeshStandardMaterial color="#2D5A27" transition={fade(900)} opacity={0.1} />
  </T.Mesh>
{/if}

{#if showAxes}
  <Line {xScale} {yScale} {zScale} color="#F7D6BA" start={[-1, 0.1, 0.1]} end={[1, 0.1, 0.1]} />
  <Line {xScale} {yScale} {zScale} color="#F7D6BA" start={[0, -0.9, 0.1]} end={[0, 1.1, 0.1]} />
{/if}

{#if showCluster}
  <T.Mesh position.x={-3.5} position.y={5.5} position.z={0} castShadow transition={scale(900)}>
    <T.TorusGeometry args={[3.125, 0.1]} />
    <T.MeshStandardMaterial color="#D5CEC9" transition={fade(900)} opacity={0.1} />
  </T.Mesh>
{/if}
