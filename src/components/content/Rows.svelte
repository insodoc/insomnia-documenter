<script>
  import Request from './Request.svelte';
  import Group from './Group.svelte';

  export let content;
  export let env;
  export let language;
  export let cookiejars;
</script>

{#each content as row}
  {#if row._type === 'request'}
    <Request request={row} {env} {language} {cookiejars} />
  {:else}
    <Group group={row} {env} />
    <svelte:self content={[...row.requests, ...row.children]} {env} {language} {cookiejars} />
  {/if}
{/each}
