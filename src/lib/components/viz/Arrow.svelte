<script>
  import { T } from "@threlte/core"
  import { fade, scale } from "$lib/utils"
  import { axisDimensions, axisArrowRotation } from "../../../stores/store"

  export let xScale
  export let yScale
  export let zScale
  export let position = [0, 0, 0]
  export let rotation = [0, 0, 0]
  export let color
</script>

<T.Mesh
  position.x={xScale(position[0])}
  position.y={yScale(position[1])}
  position.z={zScale(position[2])}
  rotation.x={rotation[0]}
  rotation.y={rotation[1]}
  rotation.z={rotation[2]}
  castShadow
  transition={scale(900)}
>
  <T.ConeGeometry args={[0.45, 2, 32]} />
  <T.MeshStandardMaterial {color} transition={fade(900)} />
</T.Mesh>
