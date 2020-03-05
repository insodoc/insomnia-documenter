<script>
  import Group from './groups/Group.svelte';

  export let requests;
  export let groups;
  export let workspace;
  export let visible;
</script>

<aside class:visible>
  <Group name={workspace.name} children={groups} requests={requests} root={true} expanded />
</aside>

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
