<script>
  import Group from "./groups/Group.svelte";

  export let requests;
  export let groups;
  export let workspace;
  export let visible;
</script>

<style>
  aside {
    background: #f6f6f6;
    width: 260px;
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    overflow: auto;
    text-overflow: clip;
    white-space: nowrap;
    z-index: 10001;
  }

  aside.visible {
    display: block;
  }
</style>

<aside class:visible>
  <Group
    name={workspace.name}
    children={groups}
    {requests}
    root={true}
    expanded />
</aside>
