<script>
  import { T } from "@threlte/core"
  import { fade, scale } from "$lib/utils"

  export let position
  export let actualPosition = { x: 0, y: 0, z: 0 }
  export let color = "#F5F1ED"
  export let radius = 0.25
  export let transparent = false
</script>

<T.Mesh
  position.x={position.x}
  position.y={position.y}
  position.z={position.z}
  castShadow
  on:click={() => console.log(position)}
  transition={scale(900)}
>
  <T.SphereGeometry args={[radius]} />
  <T.MeshStandardMaterial {color} transition={fade(900)} {transparent} opacity={0.1} />
</T.Mesh>
