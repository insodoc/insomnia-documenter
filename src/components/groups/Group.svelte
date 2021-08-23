<script>
  import Request from './Request.svelte';

  export let root = false;
  export let expanded = false;
  export let name;
  export let children;
  export let requests;

  function toggle() {
    expanded = !expanded;
  }
</script>

{#if !root}
  <span class="sidebar-list-link name" class:expanded on:click={toggle}>
    <span>{name}</span>
  </span>
{/if}

{#if expanded}
  <ul>
    {#each children as child}
      <li class="folder"><svelte:self {...child} /></li>
    {/each}
    {#each requests as request}
      <li class="request"><Request {request} /></li>
    {/each}
  </ul>
{/if}

<style>
  .sidebar-list-link {
    cursor: pointer;
  }

  .sidebar-list-link::before {
    font-family: FontAwesome;
    content: '\f07b';
  }

  .sidebar-list-link.expanded::before {
    content: '\f07c';
  }

  ul {
    list-style-type: none;
    padding-inline-start: 15px;
    font-size: 12px;
  }
</style>
