<script>
  import { T } from "@threlte/core"
  import { OrbitControls } from "@threlte/extras"
  import { cameraPosition } from "../../stores/store"

  export let step
  export let bp
  $: isDemoSection = step > 5
  $: isDesktop = bp === "lg" || bp === "xl"
</script>

<T.PerspectiveCamera let:ref={cameraRef} makeDefault position={$cameraPosition}>
  <OrbitControls
    enableDamping
    dampingFactor={0.075}
    autoRotateSpeed={-2}
    enableZoom={isDesktop && isDemoSection}
    enablePan={isDesktop && isDemoSection}
    enableRotate={isDesktop && isDemoSection}
    autoRotate={isDemoSection && !isDesktop && step < 9}
    on:change={() => {
      const { x, y, z } = cameraRef.position
      // console.log(x, y, z)
    }}
  />
</T.PerspectiveCamera>
<T.AmbientLight intensity={2.25} />
