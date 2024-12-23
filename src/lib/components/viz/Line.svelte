<script>
  import { T } from "@threlte/core"
  import { MeshLineGeometry, MeshLineMaterial } from "@threlte/extras"
  import { Vector3 } from "three"
  import { fade, scale } from "$lib/utils"

  export let xScale
  export let yScale
  export let zScale
  export let start = [0, 0, 0]
  export let end = [0, 0, 0]
  export let color
  export let dashed = false
</script>

<T.Mesh transition={scale(900)}>
  <MeshLineGeometry
    points={[
      new Vector3(xScale(start[0]), yScale(start[1]), zScale(start[2])),
      new Vector3(xScale(end[0]), yScale(end[1]), zScale(end[2])),
    ]}
  />
  <MeshLineMaterial
    width={dashed ? 0.4 : 0.45}
    {color}
    transition={fade(900)}
    dashArray={dashed ? 0.02 : 0}
    dashRatio={dashed ? 0.4 : 0}
    dashOffset={dashed ? 0.1 : 0}
    transparent={dashed}
  />
</T.Mesh>
