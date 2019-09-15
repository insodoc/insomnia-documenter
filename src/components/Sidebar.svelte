<script>
  import Group from './groups/Group.svelte';

  export let config;
</script>

<aside>
  <Group name={config.workspace.name} children={config.groups} requests={config.requests} expanded />
</aside>

<style>
  aside {
    background: #f6f6f6;
    width: 260px;
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    overflow-y: auto;
  }
</style>