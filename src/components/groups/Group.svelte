<script>
  import Request from './Request.svelte';

  export let expanded = false;
  export let name;
  export let children;
  export let requests;

  function toggle() {
    expanded = !expanded;
  }
</script>

<div class="name" class:expanded on:click={toggle}>{name}</div>

{#if expanded}
  <ul>
    {#each children as child}
    <li class="folder"><svelte:self {...child}></svelte:self></li>
    {/each}
    {#each requests as request}
    <li class="request"><Request {...request} /></li>
    {/each}
  </ul>
{/if}
