<script>
  import { T } from "@threlte/core"
  import { MeshLineGeometry, MeshLineMaterial } from "@threlte/extras"
  import { Vector3 } from "three"
  import { pc1, pc2 } from "../../../stores/store"
  import { fade, scale } from "$lib/utils"

  export let isPC2 = false
  export let xScale
  export let yScale
  export let zScale

  $: pc1Vector = new Vector3(xScale($pc1.x), yScale($pc1.y), zScale($pc1.z)).normalize()

  $: pc2Vector = new Vector3(xScale($pc2.x), yScale($pc2.y), zScale($pc2.z)).normalize()

  $: start = pc1Vector
    .clone()
    .multiplyScalar(-30 / 2)
    .toArray()
  $: end = pc1Vector
    .clone()
    .multiplyScalar(30 / 2)
    .toArray()

  $: if (isPC2) {
    start = pc2Vector
      .clone()
      .multiplyScalar(-30 / 2)
      .toArray()

    end = pc2Vector
      .clone()
      .multiplyScalar(30 / 2)
      .toArray()
  }

  $: points = [start, end].map((point) => new Vector3(...point))
</script>

<T.Mesh transition={scale(900)}>
  <MeshLineGeometry {points} />
  <MeshLineMaterial width={0.3} color={isPC2 ? "#2D5A27" : "#8E4162"} transition={fade(900)} />
</T.Mesh>
