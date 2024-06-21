<script>
  let count = 0
  const increment = () => {
    count += 1
  }
</script>

<button on:click={increment} class="rounded bg-blue-500 px-4 py-2 font-bold text-white">
  count is {count}
</button>
