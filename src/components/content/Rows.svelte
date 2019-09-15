<script>
  import applyEnv from '../../lib/applyEnv';
  import Request from './Request.svelte';
  import Group from './Group.svelte';

  export let content;
  export let env;
</script>

{#each content as row}
  {#if row._type === 'request'}
    <Request request={row} {env} />
  {:else}
    <Group group={row} {env} />
    <svelte:self content={[ ...row.requests, ...row.children ]} {env} />
  {/if}
{/each}
