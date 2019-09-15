<script>
  export let content;
</script>

{#each content as row}
  <div class="row">
    <div class="left">
      {#if row._type === 'request_group'}
        <h2>{row.name}</h2>
      {:else}
        <h3><strong>{row.method}</strong> {row.name}</h3>
      {/if}

      {#if row.description}
        <p>{row.description}</p>
      {/if}
      <hr />
    </div>
    <div class="right"></div>
  </div>

  {#if row._type === 'request_group'}
    <svelte:self content={[ ...row.requests, ...row.children ]} />
  {/if}
{/each}
