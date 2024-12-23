<script>
  export let hidden = false
  export let height = "h-[200vh]"
</script>

<section class="mb-8 flex {height} flex-col items-center justify-center p-4 text-base lg:text-lg">
  {#if !hidden}
    <div
      class="mx-auto max-w-2xl rounded-md border-l-4 border-color-orange bg-color-white p-4 opacity-90 shadow-2xl"
    >
      <slot />
    </div>
  {/if}
</section>
