<script>
  import { Text } from "@threlte/extras"
  import { fade, scale } from "$lib/utils"
  import { T } from "@threlte/core"

  export let text

  export let fontSize = 0.6
  export let rotation = { x: 0, y: 0, z: 0 }
  export let position = { x: 0, y: 0, z: 0 }
  export let color = "#44403C"
</script>

<T.Mesh transition={scale(900)}>
  <Text
    {text}
    position.x={position.x}
    position.y={position.y}
    position.z={position.z}
    rotation.x={rotation.x}
    rotation.y={rotation.y}
    rotation.z={rotation.z}
    {color}
    {fontSize}
    fillOpacity={1}
    anchorX="center"
    anchorY="center"
  />
</T.Mesh>
