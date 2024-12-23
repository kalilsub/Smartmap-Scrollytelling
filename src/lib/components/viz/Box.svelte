<script>
  import { T } from "@threlte/core"
  import Label from "./Label.svelte"
  import { fade, scale } from "$lib/utils"

  export let xScale
  export let yScale
  export let row
  export let text
  export let col
  export let color = "#44403C"
</script>

<T.Mesh
  position.x={xScale(col)}
  position.y={yScale(1 - 0.2 * row)}
  position.z={0}
  transition={scale(900)}
  castShadow
>
  <T.BoxGeometry args={[3.75, 1.75, 0.5]} />
  <T.MeshStandardMaterial {color} transition={fade(900)} />
</T.Mesh>

<Label
  fontSize={0.7}
  {text}
  position={{ x: xScale(col), y: yScale(1 - 0.2 * row) + 0.5, z: 0.55 }}
  color="#F5F1ED"
/>
