<script>
  import * as Dialog from "$lib/components/ui/dialog/index"
  import * as Drawer from "$lib/components/ui/drawer/index"

  export let bp
  export let triggerLabel = "Open"
  export let content = "This action cannot be undone."

  let open = false
</script>

{#if bp === "md" || bp === "lg" || bp === "xl"}
  <Dialog.Root bind:open>
    <Dialog.Trigger>Open</Dialog.Trigger>
    <Dialog.Content class="font-space-grotesk">
      <Dialog.Header>
        <Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
        <Dialog.Description>
          This action cannot be undone. This will permanently delete your account and remove your
          data from our servers.
        </Dialog.Description>
      </Dialog.Header>
    </Dialog.Content>
  </Dialog.Root>
{:else}
  <Drawer.Root bind:open>
    <Drawer.Trigger>Open</Drawer.Trigger>
    <Drawer.Content class="font-space-grotesk">
      <Drawer.Header>
        <Drawer.Title>Are you sure absolutely sure?</Drawer.Title>
        <Drawer.Description>This action cannot be undone.</Drawer.Description>
      </Drawer.Header>
      <Drawer.Footer>
        <button>Submit</button>
        <Drawer.Close>Cancel</Drawer.Close>
      </Drawer.Footer>
    </Drawer.Content>
  </Drawer.Root>
{/if}
