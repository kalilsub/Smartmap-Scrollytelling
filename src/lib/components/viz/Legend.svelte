<script>
  const legendData = [
    { color: "#FFA500", label: "EVP" },
    { color: "#008000", label: "Grüne" },
    { color: "#0000FF", label: "FDP" },
    { color: "#4F7942", label: "SVP" },
    { color: "#FF0000", label: "SP" },
    { color: "#32CD32", label: "GLP" },
    { color: "#C56C46", label: "Die Mitte" },
  ]
</script>

<div class="mx-auto flex flex-wrap justify-center gap-3 lg:mx-0 lg:max-w-[700px]">
  {#each legendData as item}
    <div class="flex items-center">
      <span class="mr-1 h-5 w-5 rounded-full" style="background-color: {item.color};"></span>
      <span>{item.label}</span>
    </div>
  {/each}
</div>
