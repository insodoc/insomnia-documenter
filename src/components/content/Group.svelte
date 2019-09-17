<script>
  import applyEnv from '../../lib/applyEnv';

  import showdown from 'showdown';
  const markdown = new showdown.Converter();

  export let group;
  export let env;

  $: groupData = {
    name: applyEnv(group.name, env),
    description: applyEnv(group.description, env)
  };

  $: description = groupData.description && markdown.makeHtml(groupData.description);
</script>

<div class="row">
  <div class="left">
    <h2>{groupData.name}</h2>

    {#if description}
      <p>{@html description}</p>
    {/if}

    <hr />
  </div>
  <div class="right"></div>
</div>
