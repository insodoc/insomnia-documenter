<script>
  import Group from './groups/Group.svelte';

  export let config;
  export let visible;
</script>

<aside class:visible>
  <Group name={config.workspace.name} children={config.groups} requests={config.requests} root={true} expanded />
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
