<script>
  import applyEnv from '../../lib/applyEnv';
  import Request from './Request.svelte';
  import Group from './Group.svelte';

  export let content;
  export let env;
  export let language;
</script>

{#each content as row}
  {#if row._type === 'request'}
    <Request request={row} {env} {language} />
  {:else}
    <Group group={row} {env} />
    <svelte:self content={[ ...row.requests, ...row.children ]} {env} {language} />
  {/if}
{/each}
