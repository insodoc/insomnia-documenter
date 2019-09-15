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
<a href="javascript:;" class="sidebar-list-link name" class:expanded on:click={toggle}>
  {#if expanded}
    <i class="fa fa-folder-open"></i>
  {:else}
    <i class="fa fa-folder"></i>
  {/if}

  <span>{name}</span>
</a>
{/if}

{#if expanded}
  <ul>
    {#each children as child}
    <li class="folder"><svelte:self {...child}></svelte:self></li>
    {/each}
    {#each requests as request}
    <li class="request"><Request {request} /></li>
    {/each}
  </ul>
{/if}

<style>
  ul {
    list-style-type: none;
    padding-inline-start: 15px;
    font-size: 12px;
  }
</style>
