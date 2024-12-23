<script>
  import { T } from "@threlte/core"

  import { pc1, pc2, projectedData } from "../../stores/store"
  import { standardisedResidualsAdjusted as data } from "../../data/data"
  import { MeshLineGeometry, MeshLineMaterial, OrbitControls } from "@threlte/extras"
  import { Vector3 } from "three"
  import { scaleLinear } from "d3-scale"
  import { fade, scale } from "$lib/utils"
  import Label from "./viz/Label.svelte"

  export let step

  const xScale = scaleLinear().domain([-1, 1]).range([-10, 10])
  const yScale = scaleLinear().domain([-1, 1]).range([-10, 10])
  const zScale = scaleLinear().domain([-3, 3]).range([-10, 10])

  $: pc1Vector = new Vector3(xScale($pc1.x), yScale($pc1.y), zScale($pc1.z)).normalize()
  $: pc2Vector = new Vector3(xScale($pc2.x), yScale($pc2.y), zScale($pc2.z)).normalize()

  $: showPC2 = step > 17
  $: showPC1Labels = step >= 16
  $: showPC2Labels = step >= 18

  function getProjection(point, direction) {
    const pointVector = new Vector3(xScale(point.x), yScale(point.y), zScale(point.z))
    const dot = pointVector.dot(direction)
    return direction.clone().multiplyScalar(dot)
  }

  $: projectedPointsPC1 = data.map((point) => ({
    position: getProjection(point, pc1Vector),
    color: point.color,
  }))

  $: projectedPointsPC2 = data.map((point) => ({
    position: getProjection(point, pc2Vector),
    color: point.color,
  }))

  $: projectedPoints1DPC1 = projectedPointsPC1.map((point) => {
    const xProjected = point.position.dot(pc1Vector)

    return { ...point, position: new Vector3(xProjected, 0, 0) }
  })

  $: projectedPoints1DPC2 = projectedPointsPC2.map((point) => {
    const dot = point.position.dot(pc2Vector)
    return { ...point, position: new Vector3(0, dot, 0) }
  })

  $: {
    if (showPC2) {
      projectedData.set(
        $projectedData.map((point, index) => {
          const yProjected = -projectedPoints1DPC2[index].position.dot(pc2Vector)

          return { ...point, position: new Vector3(point.position.x, yProjected, 0) }
        }),
      )
    } else {
      projectedData.set(
        $projectedData.map((point, index) => ({
          ...point,
          position: projectedPoints1DPC1[index].position,
        })),
      )
    }
  }
</script>

<T.PerspectiveCamera makeDefault position={step < 19 ? [0, 0, 15] : [0, 0, 30]} zoom={0.5}
></T.PerspectiveCamera>
<T.AmbientLight intensity={2.5} />

{#each $projectedData as { position, color }}
  <T.Mesh
    on:click={() => console.log(position)}
    position.x={position.x}
    position.z={position.z}
    position.y={position.y}
    transition={scale(900)}
    castShadow
  >
    <T.SphereGeometry args={[0.35]} />
    <T.MeshStandardMaterial {color} transition={fade(900)} />
  </T.Mesh>
{/each}

<T.Mesh transition={scale(900)}>
  <MeshLineGeometry points={[new Vector3(-12, 0, 0), new Vector3(15, 0, 0)]} />
  <MeshLineMaterial width={0.2} color="#8E4162" transition={fade(900)} />
</T.Mesh>

{#if showPC1Labels}
  <Label text="Left" position={{ x: -17.5, y: 2, z: 0.5 }} color="#8E4162" fontSize={1.75} />

  <Label text="Right" position={{ x: 17.5, y: 2, z: 0.5 }} color="#8E4162" fontSize={1.75} />
{/if}

{#if showPC2Labels}
  <Label
    text="Reform Resistance"
    position={{ x: 0, y: 14, z: 0 }}
    color="#2D5A27"
    fontSize={1.75}
  />

  <Label
    text="Reform Acceptance"
    position={{ x: 0, y: -10, z: 0 }}
    color="#2D5A27"
    fontSize={1.75}
  />
{/if}

{#if showPC2}
  <T.Mesh transition={scale(900)}>
    <MeshLineGeometry points={[new Vector3(0, -10, 0), new Vector3(0, 10, 0)]} />
    <MeshLineMaterial width={0.2} color="#2D5A27" transition={fade(900)} />
  </T.Mesh>
{/if}
