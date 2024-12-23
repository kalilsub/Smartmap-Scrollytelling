<script>
  import Arrow from "./Arrow.svelte"
  import Label from "./Label.svelte"
  import Line from "./Line.svelte"
  import { axisDimensions, axisArrowRotation, axisLabels } from "../../../stores/store"

  export let xScale
  export let yScale
  export let zScale
  export let color
  export let axis
  export let labelRotations
  export let step

  $: showResidualAxes = step > 9

  $: axisProperties = {
    x: {
      start: $axisDimensions.x1,
      end: $axisDimensions.x2,
      arrowRotation: $axisArrowRotation.x,
      labels: $axisLabels.x,
      title: "Q1",
    },
    y: {
      start: $axisDimensions.y1,
      end: $axisDimensions.y2,
      arrowRotation: $axisArrowRotation.y,
      labels: $axisLabels.y,
      title: "Q2",
    },
    z: {
      start: $axisDimensions.z1,
      end: $axisDimensions.z2,
      arrowRotation: $axisArrowRotation.z,
      labels: $axisLabels.z,
      title: "Q3",
    },
  }
</script>

<Line
  {xScale}
  {yScale}
  {zScale}
  start={axisProperties[axis].start}
  end={axisProperties[axis].end}
  {color}
/>

<Label
  text={axisProperties[axis].title}
  position={{
    x: xScale(axisProperties[axis].labels[0]),
    y: yScale(axisProperties[axis].labels[1]) + 1,
    z: zScale(axisProperties[axis].labels[2]),
  }}
  rotation={labelRotations}
  fontSize={2.75}
  {color}
/>

<Arrow
  {xScale}
  {yScale}
  {zScale}
  position={showResidualAxes ? axisProperties[axis].start : axisProperties[axis].end}
  rotation={axisProperties[axis].arrowRotation}
  {color}
/>
