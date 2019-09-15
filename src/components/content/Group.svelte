<script>
  import applyEnv from '../../lib/applyEnv';

  export let group;
  export let env;

  $: groupData = {
    name: applyEnv(group.name, env),
    description: applyEnv(group.description, env)
  };
</script>

<div class="row">
  <div class="left">
    <h2>{groupData.name}</h2>

    {#if groupData.description}
      <p>{groupData.description}</p>
    {/if}

    <hr />
  </div>
  <div class="right"></div>
</div>
